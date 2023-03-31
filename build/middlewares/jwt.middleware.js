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
exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_config_1 = __importDefault(require("../configs/index.config"));
const signJwt = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(payload, index_config_1.default.env.PRIVATE_KEY);
});
exports.signJwt = signJwt;
const authToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) {
        return index_config_1.default.response(res, 401, false, "unauthorize");
    }
    jsonwebtoken_1.default.verify(token, index_config_1.default.env.PRIVATE_KEY, (err, data) => {
        if (err)
            return index_config_1.default.response(res, 401, false, "unauthorize");
        req.body.dataAuth = data;
        next();
    });
});
exports.default = authToken;
//# sourceMappingURL=jwt.middleware.js.map