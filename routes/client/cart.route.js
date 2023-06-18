"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const cart_controller_1 = __importDefault(require("../../controllers/cart.controller"));
const jwt_middleware_1 = __importDefault(require("../../middlewares/jwt.middleware"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const router = express_1.default.Router();
router.get("/cart", jwt_middleware_1.default, cart_controller_1.default.getCart);
router.get("/cart-indicator", jwt_middleware_1.default, cart_controller_1.default.countCart);
router.delete("/cart", [
    (0, express_validator_1.query)("id")
        .not().isEmpty().withMessage("id tidak boleh kosong")
], validation_middleware_1.default, jwt_middleware_1.default, cart_controller_1.default.deleteCart);
router.post("/cart", [
    (0, express_validator_1.body)("product")
        .notEmpty().withMessage("Produk tidak boleh kosong")
], validation_middleware_1.default, jwt_middleware_1.default, cart_controller_1.default.createCart);
router.put("/cart", [
    (0, express_validator_1.query)("id")
        .not().isEmpty().withMessage("id tidak boleh kosong"),
    (0, express_validator_1.body)("qty")
        .not().isEmpty().withMessage("qyt tidak boleh kosong")
], validation_middleware_1.default, jwt_middleware_1.default, cart_controller_1.default.updateCart);
exports.default = router;
//# sourceMappingURL=cart.route.js.map