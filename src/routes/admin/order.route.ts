import express from "express"
import { query, body } from "express-validator"
import Controllers from "../../controllers/order.controller"
import validationMiddleware from "../../middlewares/validation.middleware"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

router.get("/order", authToken, validationMiddleware, Controllers.getOrder)
router.put("/order", authToken, validationMiddleware, Controllers.updateOrder)


export default router