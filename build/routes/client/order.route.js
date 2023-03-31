"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const order_controller_1 = __importDefault(require("../../controllers/order.controller"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const jwt_middleware_1 = __importDefault(require("../../middlewares/jwt.middleware"));
const router = express_1.default.Router();
router.get("/order", jwt_middleware_1.default, validation_middleware_1.default, order_controller_1.default.getOrder);
router.get("/detail-order", [
    (0, express_validator_1.query)("id")
        .notEmpty().withMessage("id tidak boleh kosong")
], jwt_middleware_1.default, validation_middleware_1.default, order_controller_1.default.detailOrder);
router.post("/order", jwt_middleware_1.default, validation_middleware_1.default, order_controller_1.default.createOrder);
exports.default = router;
//# sourceMappingURL=order.route.js.map