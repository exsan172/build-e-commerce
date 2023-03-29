/*
    routes file, edit this file to write your routes
*/

import express from "express"
import { query, body } from "express-validator"
import Controllers from "../../controllers/cart.controller"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

router.get("/cart", authToken, Controllers.getCart)

router.get("/cart-indicator", authToken, Controllers.countCart)

router.delete("/cart", authToken, [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong")

], Controllers.deleteCart)

router.post("/cart", authToken, [

    body("product")
    .not().isEmpty().withMessage("Produk tidak boleh kosong")

], Controllers.createCart)

router.put("/cart", authToken, [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong"),

    body("qty")
    .not().isEmpty().withMessage("qyt tidak boleh kosong")

], Controllers.updateCart)

export default router
