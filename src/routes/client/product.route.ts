import express from "express"
import { query } from "express-validator"
import Controllers from "../../controllers/product.controller"
import validationMiddleware from "../../middlewares/validation.middleware"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

router.get("/product", [

    query("kinds")
    .not().isEmpty().withMessage("kinds tidak boleh kosong")
    .isIn(["food", "drink"]).withMessage("kinds harus berisi food atau drink")

], authToken, validationMiddleware, Controllers.getProduct)

export default router
