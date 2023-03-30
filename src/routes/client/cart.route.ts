import express from "express"
import { query, body } from "express-validator"
import Controllers from "../../controllers/cart.controller"
import authToken from "../../middlewares/jwt.middleware"
import validationMiddleware from "../../middlewares/validation.middleware"

const router = express.Router()

router.get("/cart", authToken, Controllers.getCart)

router.get("/cart-indicator", authToken, Controllers.countCart)

router.delete("/cart", [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong")

], validationMiddleware, authToken, Controllers.deleteCart)

router.post("/cart", [

    body("product")
    .notEmpty().withMessage("Produk tidak boleh kosong")

], validationMiddleware, authToken, Controllers.createCart)

router.put("/cart", [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong"),

    body("qty")
    .not().isEmpty().withMessage("qyt tidak boleh kosong")

], validationMiddleware, authToken, Controllers.updateCart)

export default router
