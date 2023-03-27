import express from "express"
import { query, body } from "express-validator"
import Controllers from "../../controllers/product.controller"
import validationMiddleware from "../../middlewares/validation.middleware"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

export default router
