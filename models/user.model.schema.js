"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fcm_token: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: "user",
        enum: ["admin", "user"]
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
exports.default = mongoose_1.default.model("user", userSchema);
//# sourceMappingURL=user.model.schema.js.map