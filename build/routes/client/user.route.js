"use strict";
/*
    routes file, edit this file to write your routes
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const validation_middleware_1 = __importDefault(require("../../middlewares/validation.middleware"));
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("email tidak boleh kosong")
        .isEmail().withMessage("format email salah"),
    (0, express_validator_1.body)("password")
        .notEmpty().withMessage("password tidak boleh kosong")
        .isLength({ min: 8 }).withMessage("pasword minimal 8 karakter"),
    (0, express_validator_1.body)("fcm_token")
        .notEmpty().withMessage("fcm_token tidak boleh kosong")
], validation_middleware_1.default, user_controller_1.default.login);
router.post("/login-google", [
    (0, express_validator_1.body)("verification_token")
        .notEmpty().withMessage("verification_token tidak boleh kosong"),
    (0, express_validator_1.body)("fcm_token")
        .notEmpty().withMessage("fcm_token tidak boleh kosong")
], validation_middleware_1.default, user_controller_1.default.loginGoogle);
router.post("/register", [
    (0, express_validator_1.body)("name")
        .notEmpty().withMessage("nama tidak boleh kosong"),
    (0, express_validator_1.body)("email")
        .notEmpty().withMessage("email tidak boleh kosong")
        .isEmail().withMessage("format email salah"),
    (0, express_validator_1.body)("password")
        .notEmpty().withMessage("password tidak boleh kosong")
        .isLength({ min: 8 }).withMessage("pasword minimal 8 karakter"),
    (0, express_validator_1.body)("role")
        .notEmpty().withMessage("role tidak boleh kosong")
        .isIn(["admin", "user"]).withMessage("role hanya berisi admin atau user"),
    (0, express_validator_1.body)("fcm_token")
        .notEmpty().withMessage("fcm_token tidak boleh kosong")
], validation_middleware_1.default, user_controller_1.default.register);
exports.default = router;
//# sourceMappingURL=user.route.js.map