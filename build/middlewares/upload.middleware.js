"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.fileError = exports.uploadMiddleware = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const index_config_1 = __importDefault(require("../configs/index.config"));
cloudinary_1.v2.config({
    cloud_name: index_config_1.default.env.CLOUD_NAME,
    api_key: index_config_1.default.env.API_KEY,
    api_secret: index_config_1.default.env.API_SECRET
});
exports.upload = (0, multer_1.default)({
    dest: index_config_1.default.env.FOLDER_NAME,
    limits: { fileSize: 200000 },
    fileFilter: (req, file, callback) => {
        const allowFormat = /jpeg|jpg|png|gif/;
        const ext = allowFormat.test(file.originalname.split('.').pop());
        const mimetype = allowFormat.test(file.mimetype);
        if (ext && mimetype) {
            callback(null, true);
        }
        else {
            callback(new Error('hanya file images yang di perbolehkan'));
        }
    }
});
const uploadMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file !== undefined) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path, { folder: index_config_1.default.env.FOLDER_NAME });
            req.body.fileName = result.original_filename;
            req.body.public_id = result.public_id;
            req.body.fileUrl = result.secure_url;
        }
        else if (req.method === "POST" && req.file === undefined) {
            return index_config_1.default.response(res, 400, false, "images tidak valid", [], [
                {
                    field: "images",
                    message: "gambar yang di input tidak valid"
                }
            ]);
        }
        next();
    }
    catch (error) {
        console.error(error);
        return index_config_1.default.response(res, 500, false, error);
    }
});
exports.uploadMiddleware = uploadMiddleware;
const fileError = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof multer_1.default.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return index_config_1.default.response(res, 400, false, "ukuran gambar terlalu besar", [], [
            {
                field: "images",
                message: "ukuran gambar terlalu besar, maksimal 200kb"
            }
        ]);
    }
    else if (err.message !== "" || err.message !== undefined) {
        return index_config_1.default.response(res, 400, false, err.message, [], [
            {
                field: "images",
                message: err.message
            }
        ]);
    }
    else {
        next(err);
    }
});
exports.fileError = fileError;
const deleteFile = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(publicId);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.deleteFile = deleteFile;
//# sourceMappingURL=upload.middleware.js.map