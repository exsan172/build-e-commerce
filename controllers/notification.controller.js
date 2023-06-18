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
const index_config_1 = __importDefault(require("../configs/index.config"));
const notification_service_1 = __importDefault(require("../services/notification.service"));
const notificationController = {
    getNotification: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notif = yield notification_service_1.default.getNotification({ for_user: req.body.dataAuth.id_user });
            return index_config_1.default.response(res, 200, true, "sukses mengambil data notifikasi", notif);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, error.message);
        }
    }),
    getNotificationIndicator: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const notif = yield notification_service_1.default.getNotification({ for_user: req.body.dataAuth.id_user, read: false });
            return index_config_1.default.response(res, 200, true, "sukses mengambil data notifikasi", {
                indicator: notif.length > 0 ? true : false
            });
        }
        catch (error) {
            return index_config_1.default.response(res, 400, error.message);
        }
    }),
    readNotif: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const findNotif = yield notification_service_1.default.getNotification({ for_user: req.body.dataAuth.id_user });
            if (findNotif === null) {
                return index_config_1.default.response(res, 400, false, "data notif tidak ada sekarang");
            }
            const readAll = yield notification_service_1.default.updateManyNotification({ for_user: req.body.dataAuth.id_user }, { read: true });
            if (readAll) {
                return index_config_1.default.response(res, 200, true, "sukses notif berhasil di update");
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, error.message);
        }
    })
};
exports.default = notificationController;
//# sourceMappingURL=notification.controller.js.map