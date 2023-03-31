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
const cart_service_1 = __importDefault(require("../services/cart.service"));
const product_service_1 = __importDefault(require("../services/product.service"));
const index_config_1 = __importDefault(require("../configs/index.config"));
const CartController = {
    getCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let total = 0;
            const cart = yield cart_service_1.default.getCart({});
            for (const i in cart) {
                total += cart[i].total_price;
            }
            return index_config_1.default.response(res, 200, true, "sukses mengambil data", {
                cart_data: cart,
                total_price: total
            });
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    countCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield cart_service_1.default.countCart(req.body.dataAuth.id_user);
            return index_config_1.default.response(res, 200, true, "sukses mengambil data", {
                total_cart: count
            });
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    createCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getProduct = yield product_service_1.default.getOneProduct(req.body.product);
            if (getProduct === null) {
                return index_config_1.default.response(res, 400, false, "data tidak di temukan", [], [
                    {
                        field: "product",
                        message: `data dengan id ${req.body.product} tidak di temukan`
                    }
                ]);
            }
            const create = yield cart_service_1.default.createCart({
                product: getProduct,
                qty: 1,
                total_price: getProduct.price,
                created_by: req.body.dataAuth.id_user
            });
            return index_config_1.default.response(res, 201, true, "sukses membuat data", create);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    updateCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.body.qty < 1) {
                return index_config_1.default.response(res, 400, false, "minimal qty tidak valid", [], [
                    {
                        field: "qty",
                        message: `minimal qty adalah 1`
                    }
                ]);
            }
            const checkCart = yield cart_service_1.default.getOneCart(req.query.id);
            if (checkCart === null) {
                return index_config_1.default.response(res, 400, false, "data tidak di temukan", [], [
                    {
                        field: "id",
                        message: `data dengan id ${req.query.id} tidak di temukan`
                    }
                ]);
            }
            yield cart_service_1.default.updateCart(req.query.id, {
                qty: req.body.qty,
                total_price: checkCart.product.price * req.body.qty,
                update_at: (0, moment_timezone_1.default)().tz("Asia/Jakarta")
            });
            const latestData = yield cart_service_1.default.getOneCart(req.query.id);
            return index_config_1.default.response(res, 200, true, "sukses update data", latestData);
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    }),
    deleteCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkCart = yield cart_service_1.default.getOneCart(req.query.id);
            if (checkCart === null) {
                return index_config_1.default.response(res, 400, false, "data tidak di temukan", [], [
                    {
                        field: "id",
                        message: `data dengan id ${req.query.id} tidak di temukan`
                    }
                ]);
            }
            yield cart_service_1.default.deletetCart(req.query.id);
            return index_config_1.default.response(res, 200, true, "sukses hapus data");
        }
        catch (error) {
            return index_config_1.default.response(res, 400, false, error.message);
        }
    })
};
exports.default = CartController;
//# sourceMappingURL=cart.controller.js.map