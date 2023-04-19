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
const order_model_schema_1 = __importDefault(require("../models/order.model.schema"));
const orderService = {
    getOrder: (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_schema_1.default.find(query).sort({ created_at: -1 });
    }),
    getOneOrder: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_schema_1.default.findOne({ _id: id });
    }),
    deletetOrder: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_schema_1.default.deleteOne({ _id: id });
    }),
    createOrder: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_schema_1.default.create(data);
    }),
    updateOrder: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_schema_1.default.updateOne({ _id: id }, data);
    })
};
exports.default = orderService;
//# sourceMappingURL=order.service.js.map