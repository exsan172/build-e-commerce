"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = __importDefault(require("../services/user.service"));
const index_config_1 = __importDefault(require("../configs/index.config"));
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const notification_helper_1 = require("../helpers/notification.helper");
const saltRound = 10;
const userControllers = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findEmail = yield user_service_1.default.getOne({ email: req.body.email });
            if (findEmail === null) {
                return index_config_1.default.response(res, 400, false, "email tidak di temukan", [], [
                    {
                        field: "email",
                        message: "email tidak di temukan"
                    }
                ]);
            }
            else {
                const comparePassword = bcrypt_1.default.compareSync(req.body.password, findEmail.password);
                if (comparePassword) {
                    if (req.body.fcm_token !== undefined && req.body.fcm_token !== "") {
                        if (findEmail.fcm_token !== req.body.fcm_token) {
                            yield user_service_1.default.updateUser(findEmail._id, {
                                fcm_token: req.body.fcm_token
                            });
                        }
                    }
                    const latestDataUser = yield user_service_1.default.getOne({ email: req.body.email });
                    const sign = yield (0, jwt_middleware_1.signJwt)({
                        name: latestDataUser.name,
                        role: latestDataUser.role,
                        id_user: latestDataUser._id,
                        fcm_token: latestDataUser.fcm_token
                    });
                    return index_config_1.default.response(res, 200, true, "sukses masuk", {
                        token: sign,
                        data: latestDataUser
                    });
                }
                else {
                    return index_config_1.default.response(res, 400, false, "password salah", [], [
                        {
                            field: "password",
                            message: "password salah"
                        }
                    ]);
                }
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    loginGoogle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const dataUser = yield (0, notification_helper_1.loginWithGoogle)(req.body.verification_token);
            if (dataUser.status === true) {
                const sign = yield (0, jwt_middleware_1.signJwt)({
                    name: dataUser.message.name,
                    role: "user",
                    id_user: dataUser.message.id_user,
                    fcm_token: req.body.fcm_token
                });
                return index_config_1.default.response(res, 200, true, "sukses masuk", {
                    token: sign,
                    data: {
                        name: dataUser.message.name,
                        role: "user",
                        id_user: dataUser.message.id_user,
                        fcm_token: req.body.fcm_token
                    }
                });
            }
            else {
                return index_config_1.default.response(res, 400, false, dataUser.message);
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findEmail = yield user_service_1.default.getOne({ email: req.body.email });
            if (findEmail !== null) {
                return index_config_1.default.response(res, 400, false, "email sudah di gunakan", [], [
                    {
                        field: "email",
                        message: "email sudah di gunakan"
                    }
                ]);
            }
            const hashPassword = bcrypt_1.default.hashSync(req.body.password, saltRound);
            const regis = yield user_service_1.default.createUser({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
                role: req.body.role,
                fcm_token: req.body.fcm_token,
            });
            if (regis) {
                const sign = yield (0, jwt_middleware_1.signJwt)({
                    name: req.body.name,
                    role: req.body.role,
                    id_user: regis._id,
                    fcm_token: req.body.fcm_token
                });
                return index_config_1.default.response(res, 201, true, "sukses registrasi", {
                    token: sign,
                    data: regis
                });
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    })
};
exports.default = userControllers;
//# sourceMappingURL=user.controller.js.map