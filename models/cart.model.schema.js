"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    product: {
        type: Object,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    total_price: {
        type: Number,
        require: true
    },
    created_by: {
        type: String,
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
exports.default = mongoose_1.default.model("cart", cartSchema);
//# sourceMappingURL=cart.model.schema.js.map