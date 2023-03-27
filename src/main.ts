/*
    main file, edit this file if needed.
*/

import express from "express"
import loger from "morgan"
import cors from "cors"
import config from "./configs/index.config"

// import router
import ClientCart from "./routes/client/cart.route"
import ClientNotification from "./routes/client/notification.route"
import ClientProduct from "./routes/client/product.route"
import ClientUser from "./routes/client/user.route"

import AdminProduct from "./routes/admin/product.route"
import AdminOrder from "./routes/admin/order.route"

config.dbConnection()
const app = express()

app.use(cors({
    origin : [config.env.ALLOW_CORS || "*"]
}))
app.use(loger("common"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use("/api/client" ,ClientCart)
app.use("/api/client" ,ClientNotification)
app.use("/api/client" ,ClientProduct)
app.use("/api/client" ,ClientUser)

// admin
app.use("/api/admin" ,AdminProduct)
app.use("/api/admin" ,AdminOrder)

// 404 handle
app.use((req, res, next) => {
    config.response(res, 404, false, "path not found!")
})

// error handle
app.use((err, req, res, next) => {
    config.response(res, 500, err)
})

app.listen(config.env.PORT, () => {
    console.log(`Apps runing on port ${config.env.PORT}`)
})
