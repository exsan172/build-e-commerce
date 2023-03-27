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


router.put("/product", [

    query("id")
    .not().isEmpty().withMessage("id tidak boleh kosong"),

    body("product_name")
    .isEmpty().withMessage("product_name tidak boleh kosong"),

    body("price")
    .isEmpty().withMessage("price tidak boleh kosong"),

    body("kinds")
    .not().isEmpty().withMessage("kinds tidak boleh kosong")
    .isIn(["food", "drink"]).withMessage("kinds harus food atau drink"),

    body("description")
    .isEmpty().withMessage("description tidak boleh kosong")

], authToken, validationMiddleware, Controllers.updateProduct)


router.post("/product", [

    body("product_name")
    .isEmpty().withMessage("product_name tidak boleh kosong"),

    body("price")
    .isEmpty().withMessage("price tidak boleh kosong"),

    body("kinds")
    .custom((value) => {
        console.log("value => ", value);
        
    })
    .not().isEmpty().withMessage("kinds tidak boleh kosong")
    .isIn(['food', 'drink']).withMessage("kinds harus food atau drink"),

    body("description")
    .isEmpty().withMessage("description tidak boleh kosong")

], authToken, upload.single("images"), uploadMiddleware, fileError, validationMiddleware, Controllers.createProduct)

export default router
