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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const product_service_1 = __importDefault(require("../services/product.service"));
const index_config_1 = __importDefault(require("../configs/index.config"));
const upload_middleware_1 = require("../middlewares/upload.middleware");
const ProductController = {
    getProduct: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield product_service_1.default.getProduct({ kinds: req.query.kinds });
            return index_config_1.default.response(res, 200, true, "sukses mengambil data produk", product);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, true, error.message);
        }
    }),
    createProduct: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkRole = req.body.dataAuth.role;
            if (checkRole === "user") {
                yield (0, upload_middleware_1.deleteFile)(req.body.public_id);
                return index_config_1.default.response(res, 400, false, "hanya admin yang bisa mengubah data");
            }
            const create = yield product_service_1.default.createProduct({
                product_name: req.body.product_name,
                price: req.body.price,
                description: req.body.description,
                kinds: req.body.kinds,
                images: [
                    {
                        name: req.body.fileName,
                        url: req.body.fileUrl,
                        public_id: req.body.public_id
                    }
                ]
            });
            return index_config_1.default.response(res, 201, true, "sukses membuat produk", create);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, true, error.message);
        }
    }),
    deleteProduct: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkRole = req.body.dataAuth.role;
            if (checkRole === "user") {
                return index_config_1.default.response(res, 400, false, "hanya admin yang bisa mengubah data");
            }
            const findData = yield product_service_1.default.getOneProduct(req.query.id);
            if (findData === null) {
                return index_config_1.default.response(res, 400, false, "data produk tidak di temukan", [], [
                    {
                        field: "id",
                        message: `data produk dengan ${req.query.id} tidak di temukan`
                    }
                ]);
            }
            if (yield (0, upload_middleware_1.deleteFile)(findData.images[0].public_id)) {
                yield product_service_1.default.deletetProduct(req.query.id);
                return index_config_1.default.response(res, 200, true, "sukses menghapus data produk");
            }
            else {
                return index_config_1.default.response(res, 400, false, "gagal hapus data produk");
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, true, error.message);
        }
    }),
    updateProduct: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkRole = req.body.dataAuth.role;
            if (checkRole === "user") {
                return index_config_1.default.response(res, 400, false, "hanya admin yang bisa mengubah data");
            }
            const findData = yield product_service_1.default.getOneProduct(req.query.id);
            if (findData === null) {
                return index_config_1.default.response(res, 400, false, "data produk tidak di temukan", [], [
                    {
                        field: "id",
                        message: `data produk dengan ${req.query.id} tidak di temukan`
                    }
                ]);
            }
            let dataProduct = {
                product_name: req.body.product_name,
                price: req.body.price,
                description: req.body.description,
                kinds: req.body.kinds,
                updated_at: (0, moment_timezone_1.default)().tz("Asia/Jakarta")
            };
            if (req.file !== undefined) {
                if (yield (0, upload_middleware_1.deleteFile)(findData.images[0].public_id)) {
                    dataProduct["images"] = [
                        {
                            name: req.body.fileName,
                            url: req.body.fileUrl,
                            public_id: req.body.public_id
                        }
                    ];
                }
            }
            yield product_service_1.default.updateProduct(req.query.id, dataProduct);
            const latestData = yield product_service_1.default.getOneProduct(req.query.id);
            return index_config_1.default.response(res, 201, true, "sukses update produk", latestData);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, true, error.message);
        }
    }),
};
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map