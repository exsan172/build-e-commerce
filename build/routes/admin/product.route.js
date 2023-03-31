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
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = express_1.default.Router();
router.get("/product", [
    (0, express_validator_1.query)("kinds")
        .not().isEmpty().withMessage("kinds tidak boleh kosong")
        .isIn(["food", "drink"]).withMessage("kinds harus berisi food atau drink")
], jwt_middleware_1.default, validation_middleware_1.default, product_controller_1.default.getProduct);
router.delete("/product", [
    (0, express_validator_1.query)("id")
        .not().isEmpty().withMessage("id tidak boleh kosong")
], jwt_middleware_1.default, validation_middleware_1.default, product_controller_1.default.deleteProduct);
router.put("/product", jwt_middleware_1.default, upload_middleware_1.upload.single("images"), upload_middleware_1.uploadMiddleware, upload_middleware_1.fileError, [
    (0, express_validator_1.query)("id")
        .not().isEmpty().withMessage("id tidak boleh kosong"),
    (0, express_validator_1.body)("product_name")
        .not().isEmpty().withMessage("product_name tidak boleh kosong"),
    (0, express_validator_1.body)("price")
        .not().isEmpty().withMessage("price tidak boleh kosong"),
    (0, express_validator_1.body)("kinds")
        .not().isEmpty().withMessage("kinds tidak boleh kosong")
        .isIn(["food", "drink"]).withMessage("kinds harus food atau drink"),
    (0, express_validator_1.body)("description")
        .not().isEmpty().withMessage("description tidak boleh kosong")
], validation_middleware_1.default, product_controller_1.default.updateProduct);
router.post("/product", jwt_middleware_1.default, upload_middleware_1.upload.single("images"), upload_middleware_1.uploadMiddleware, upload_middleware_1.fileError, [
    (0, express_validator_1.body)("product_name")
        .not().isEmpty().withMessage("product_name tidak boleh kosong"),
    (0, express_validator_1.body)("price")
        .not().isEmpty().withMessage("price tidak boleh kosong"),
    (0, express_validator_1.body)("kinds")
        .not().isEmpty().withMessage("kinds tidak boleh kosong")
        .isIn(['food', 'drink']).withMessage("kinds harus food atau drink"),
    (0, express_validator_1.body)("description")
        .not().isEmpty().withMessage("description tidak boleh kosong")
], validation_middleware_1.default, product_controller_1.default.createProduct);
exports.default = router;
//# sourceMappingURL=product.route.js.map