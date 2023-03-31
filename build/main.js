"use strict";
/*
    main file, edit this file if needed.
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_config_1 = __importDefault(require("./configs/index.config"));
// import router
const cart_route_1 = __importDefault(require("./routes/client/cart.route"));
const notification_route_1 = __importDefault(require("./routes/client/notification.route"));
const product_route_1 = __importDefault(require("./routes/client/product.route"));
const user_route_1 = __importDefault(require("./routes/client/user.route"));
const order_route_1 = __importDefault(require("./routes/client/order.route"));
const product_route_2 = __importDefault(require("./routes/admin/product.route"));
const order_route_2 = __importDefault(require("./routes/admin/order.route"));
index_config_1.default.dbConnection();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [index_config_1.default.env.ALLOW_CORS || "*"]
}));
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// routes
app.use("/api/client", cart_route_1.default);
app.use("/api/client", notification_route_1.default);
app.use("/api/client", product_route_1.default);
app.use("/api/client", user_route_1.default);
app.use("/api/client", order_route_1.default);
// admin
app.use("/api/admin", product_route_2.default);
app.use("/api/admin", order_route_2.default);
// 404 handle
app.use((req, res, next) => {
    index_config_1.default.response(res, 404, false, "path not found!");
});
// error handle
app.use((err, req, res, next) => {
    index_config_1.default.response(res, 500, err);
});
app.listen(index_config_1.default.env.PORT, () => {
    console.log(`Apps runing on port ${index_config_1.default.env.PORT}`);
});
//# sourceMappingURL=main.js.map