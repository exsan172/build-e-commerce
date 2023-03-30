import express from "express"
import { query } from "express-validator"
import Controllers from "../../controllers/order.controller"
import validationMiddleware from "../../middlewares/validation.middleware"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

router.get("/order", authToken, validationMiddleware, Controllers.getOrder)
router.get("/detail-order", [

    query("id")
    .notEmpty().withMessage("id tidak boleh kosong")

], authToken, validationMiddleware, Controllers.detailOrder)
router.post("/order", authToken, validationMiddleware, Controllers.createOrder)


export default router