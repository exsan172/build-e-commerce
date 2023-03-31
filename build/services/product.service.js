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
const product_model_schema_1 = __importDefault(require("../models/product.model.schema"));
const productService = {
    getProduct: (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_schema_1.default.find(query);
    }),
    getOneProduct: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_schema_1.default.findOne({ _id: id }).select("_id product_name images price description, kinds");
    }),
    deletetProduct: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_schema_1.default.deleteOne({ _id: id });
    }),
    createProduct: (payload) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_schema_1.default.create(payload);
    }),
    updateProduct: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_schema_1.default.updateOne({ _id: id }, data);
    })
};
exports.default = productService;
//# sourceMappingURL=product.service.js.map