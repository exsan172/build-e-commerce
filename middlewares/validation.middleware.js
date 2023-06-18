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
const index_config_1 = __importDefault(require("../configs/index.config"));
const express_validator_1 = require("express-validator");
const upload_middleware_1 = require("./upload.middleware");
const validationMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    let message = [];
    errors.array().map((data) => {
        message.push({
            field: data.param,
            message: data.msg
        });
    });
    if (req.body.public_id !== undefined) {
        yield (0, upload_middleware_1.deleteFile)(req.body.public_id);
    }
    return index_config_1.default.response(res, 442, false, "validasi input", [], message);
});
exports.default = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map