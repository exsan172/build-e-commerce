import express from "express"
import { query, body } from "express-validator"
import Controllers from "../../controllers/product.controller"
import validationMiddleware from "../../middlewares/validation.middleware"
import authToken from "../../middlewares/jwt.middleware"
import { upload, uploadMiddleware, fileError } from "../../middlewares/upload.middleware"

const router = express.Router()

router.get("/product", [

    query("kinds")
    .not().isEmpty().withMessage("kinds tidak boleh kosong")
    .isIn(["food", "drink"]).withMessage("kinds harus berisi food atau drink")

], authToken, validationMiddleware, Controllers.getProduct)


router.delete("/product", [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong")

], authToken, validationMiddleware, Controllers.deleteProduct)


router.put("/product", upload.single("images"), uploadMiddleware, fileError, [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong"),

    body("product_name")
    .not().isEmpty().withMessage("product_name tidak boleh kosong"),

    body("price")
    .not().isEmpty().withMessage("price tidak boleh kosong"),

    body("kinds")
    .not().isEmpty().withMessage("kinds tidak boleh kosong")
    .isIn(["food", "drink"]).withMessage("kinds harus food atau drink"),

    body("description")
    .not().isEmpty().withMessage("description tidak boleh kosong")

], validationMiddleware, authToken, Controllers.updateProduct)


router.post("/product", upload.single("images"), uploadMiddleware, fileError, [

    body("product_name")
    .not().isEmpty().withMessage("product_name tidak boleh kosong"),

    body("price")
    .not().isEmpty().withMessage("price tidak boleh kosong"),

    body("kinds")
    .not().isEmpty().withMessage("kinds tidak boleh kosong")
    .isIn(['food', 'drink']).withMessage("kinds harus food atau drink"),

    body("description")
    .not().isEmpty().withMessage("description tidak boleh kosong")

], validationMiddleware, authToken, Controllers.createProduct)

export default router
