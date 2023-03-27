/*
    routes file, edit this file to write your routes
*/

import express from "express"
import { body } from "express-validator"
import Controllers from "../../controllers/user.controller"
import validationMiddleware from "../../middlewares/validation.middleware"

const router = express.Router()

router.post("/login", [

    body("email")
    .notEmpty().withMessage("email tidak boleh kosong")
    .isEmail().withMessage("format email salah"),

    body("password")
    .notEmpty().withMessage("password tidak boleh kosong")
    .isLength({ min : 8 }).withMessage("pasword minimal 8 karakter"),

],validationMiddleware, Controllers.login)

router.post("/register", [

    body("name")
    .notEmpty().withMessage("nama tidak boleh kosong"),

    body("email")
    .notEmpty().withMessage("email tidak boleh kosong")
    .isEmail().withMessage("format email salah"),

    body("password")
    .notEmpty().withMessage("password tidak boleh kosong")
    .isLength({ min : 8 }).withMessage("pasword minimal 8 karakter"),

    body("role")
    .notEmpty().withMessage("role tidak boleh kosong")
    .isIn(["admin", "user"]).withMessage("role hanya berisi admin atau user")

], validationMiddleware, Controllers.register)

export default router
