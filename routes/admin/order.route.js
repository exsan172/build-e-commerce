"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../../controllers/order.controller"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const jwt_middleware_1 = __importDefault(require("../../middlewares/jwt.middleware"));
const router = express_1.default.Router();
router.get("/order", jwt_middleware_1.default, validation_middleware_1.default, order_controller_1.default.getOrder);
router.put("/order", jwt_middleware_1.default, validation_middleware_1.default, order_controller_1.default.updateOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map