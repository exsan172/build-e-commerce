"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    product: {
        type: (Array),
        require: true
    },
    total_price: {
        type: Number,
        require: true
    },
    pay_status: {
        type: Boolean,
        require: true,
        default: false
    },
    order_status: {
        type: Boolean,
        require: true,
        default: false
    },
    qr_code_id: {
        type: String,
        require: true,
        default: null,
    },
    created_by: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        require: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});
exports.default = mongoose_1.default.model("order", orderSchema);
//# sourceMappingURL=order.model.schema.js.map