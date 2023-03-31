"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_name: {
        type: String,
        require: true
    },
    images: {
        type: (Array),
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    kinds: {
        type: String,
        enum: ["food", "drink"],
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        require: true
    },
    updated_at: {
        type: Date,
        default: null
    }
});
exports.default = mongoose_1.default.model("product", productSchema);
//# sourceMappingURL=product.model.schema.js.map