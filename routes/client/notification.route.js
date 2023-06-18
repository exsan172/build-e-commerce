"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = __importDefault(require("../../controllers/notification.controller"));
const jwt_middleware_1 = __importDefault(require("../../middlewares/jwt.middleware"));
const router = express_1.default.Router();
router.get("/notification", jwt_middleware_1.default, notification_controller_1.default.getNotification);
router.get("/notification-indicator", jwt_middleware_1.default, notification_controller_1.default.getNotificationIndicator);
router.put("/notification", jwt_middleware_1.default, notification_controller_1.default.readNotif);
exports.default = router;
//# sourceMappingURL=notification.route.js.map