"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const product_controller_1 = __importDefault(require("../../controllers/product.controller"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const jwt_middleware_1 = __importDefault(require("../../middlewares/jwt.middleware"));
const router = express_1.default.Router();
router.get("/product", [
    (0, express_validator_1.query)("kinds")
        .not().isEmpty().withMessage("kinds tidak boleh kosong")
        .isIn(["food", "drink"]).withMessage("kinds harus berisi food atau drink")
], jwt_middleware_1.default, validation_middleware_1.default, product_controller_1.default.getProduct);
exports.default = router;
//# sourceMappingURL=product.route.js.map