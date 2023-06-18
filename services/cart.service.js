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
const cart_model_schema_1 = __importDefault(require("../models/cart.model.schema"));
const cartService = {
    getCart: (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.find(query);
    }),
    getOneCart: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.findOne({ _id: id });
    }),
    deletetCart: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.deleteOne({ _id: id });
    }),
    deletetManyCart: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.deleteMany({ _id: id });
    }),
    createCart: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.create(data);
    }),
    updateCart: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.updateOne({ _id: id }, data);
    }),
    countCart: (idUser) => __awaiter(void 0, void 0, void 0, function* () {
        return yield cart_model_schema_1.default.find({ created_by: idUser }).count();
    }),
};
exports.default = cartService;
//# sourceMappingURL=cart.service.js.map