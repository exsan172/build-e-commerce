"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    message: {
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        require: true,
        default: false
    },
    for_user: {
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
exports.default = mongoose_1.default.model("notification", notificationSchema);
//# sourceMappingURL=notification.model.schema.js.map