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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const order_service_1 = __importDefault(require("../services/order.service"));
const cart_service_1 = __importDefault(require("../services/cart.service"));
const index_config_1 = __importDefault(require("../configs/index.config"));
const notification_service_1 = __importDefault(require("../services/notification.service"));
const notification_helper_1 = __importDefault(require("../helpers/notification.helper"));
const generateQr_helper_1 = __importDefault(require("../helpers/generateQr.helper"));
const user_service_1 = __importDefault(require("../services/user.service"));
const orderController = {
    getOrder: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let filterData = {};
            if (req.query.is_admin === undefined && req.query.is_admin !== "true") {
                filterData["created_by"] = req.body.dataAuth.id_user;
            }
            if (req.query.order_status !== undefined) {
                filterData["order_status"] = req.query.order_status;
            }
            if (req.query.id !== undefined) {
                filterData["_id"] = req.query.id;
            }
            const order = yield order_service_1.default.getOrder(filterData);
            return index_config_1.default.response(res, 200, true, "sukses mengambil data order", order);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    createOrder: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkRole = req.body.dataAuth.role;
            if (checkRole === "admin") {
                return index_config_1.default.response(res, 400, false, "hanya user yang bisa membuat order");
            }
            const getDataCart = yield cart_service_1.default.getCart({ created_by: req.body.dataAuth.id_user });
            if (getDataCart.length > 0) {
                let listId = [];
                let totalPrice = 0;
                for (const i in getDataCart) {
                    listId.push(getDataCart[i]._id);
                    totalPrice += getDataCart[i].total_price;
                }
                const deleteCart = yield cart_service_1.default.deletetManyCart(listId);
                if (deleteCart) {
                    const order = yield order_service_1.default.createOrder({
                        product: getDataCart,
                        total_price: totalPrice,
                        created_by: req.body.dataAuth.id_user
                    });
                    const sendNotif = yield (0, notification_helper_1.default)(req.body.dataAuth.fcm_token, "Order berhasil di buat", "Order berhasil di buat, silahkan lakukan pembayaran di kasir");
                    if (sendNotif.status === true) {
                        yield notification_service_1.default.createNotification({
                            message: "Order berhasil di buat, silahkan lakukan pembayaran di kasir",
                            for_user: req.body.dataAuth.id_user
                        });
                    }
                    // notif to admin
                    const getAdminAccout = yield user_service_1.default.getUserAllWithFilter({ role: "admin" });
                    for (const l in getAdminAccout) {
                        yield (0, notification_helper_1.default)(getAdminAccout[l].fcm_token, "Order baru tersedia", "Order baru di buat, silahkan konfirmasi pemesanan");
                    }
                    const QRGenerate = yield (0, generateQr_helper_1.default)(order._id);
                    if (QRGenerate.status === true) {
                        yield order_service_1.default.updateOrder(order._id, {
                            qr_code_id: QRGenerate.message
                        });
                    }
                    const getLatestDataOrder = yield order_service_1.default.getOneOrder(order._id);
                    return index_config_1.default.response(res, 200, true, "sukses membuat order baru", getLatestDataOrder);
                }
            }
            else {
                return index_config_1.default.response(res, 400, false, "data cart tidak di temukan");
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    detailOrder: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const detail = yield order_service_1.default.getOneOrder(req.query.id);
            if (detail === null) {
                return index_config_1.default.response(res, 400, false, "data order tidak di temukan", [], [
                    {
                        field: "id",
                        message: `data dengan id ${req.query.id} tidak di temukan`
                    }
                ]);
            }
            else {
                return index_config_1.default.response(res, 200, true, "sukses mengambil data order", detail);
            }
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    updateOrder: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkRole = req.body.dataAuth.role;
            if (checkRole === "user") {
                return index_config_1.default.response(res, 400, false, "hanya admin yang bisa mengubah data");
            }
            const checkOrder = yield order_service_1.default.getOneOrder(req.query.id);
            if (checkOrder === null) {
                return index_config_1.default.response(res, 400, false, "data order tidak di temukan", [], [
                    {
                        field: "id",
                        message: `data dengan id ${req.query.id} tidak di temukan`
                    }
                ]);
            }
            let orderData = {
                updated_at: (0, moment_timezone_1.default)().tz("Asia/Jakarta")
            };
            if (req.body.order_status !== undefined) {
                orderData["order_status"] = req.body.order_status;
            }
            if (req.body.pay_status !== undefined) {
                orderData["pay_status"] = req.body.pay_status;
            }
            yield order_service_1.default.updateOrder(req.query.id, orderData);
            const latestData = yield order_service_1.default.getOneOrder(req.query.id);
            // get role user
            const userRole = yield user_service_1.default.getOne({ _id: latestData.created_by });
            if (userRole !== null) {
                if (req.body.order_status !== undefined && latestData.order_status === true) {
                    const sendNotif = yield (0, notification_helper_1.default)(userRole.fcm_token, "Pesanan selesai", "Pesanan selesai, silahkan ambil di kasir");
                    if (sendNotif.status === true) {
                        yield notification_service_1.default.createNotification({
                            message: "Pesanan selesai, silahkan ambil di kasir",
                            for_user: latestData.created_by
                        });
                    }
                }
                if (req.body.pay_status !== undefined && latestData.pay_status === true) {
                    const sendNotif = yield (0, notification_helper_1.default)(userRole.fcm_token, "Pembayaran di konfirmasi", "Pembayaran dikonfirmasi, silahkan menunggu pesanan anda");
                    if (sendNotif.status === true) {
                        yield notification_service_1.default.createNotification({
                            message: "Pembayaran dikonfirmasi, silahkan menunggu pesanan anda",
                            for_user: latestData.created_by
                        });
                    }
                }
            }
            return index_config_1.default.response(res, 200, true, "sukses update data order", latestData);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    })
};
exports.default = orderController;
//# sourceMappingURL=order.controller.js.map