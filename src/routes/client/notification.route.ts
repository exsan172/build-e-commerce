/*
    routes file, edit this file to write your routes
*/

import express from "express"
import Controllers from "../../controllers/notification.controller"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

router.get("/notification", authToken, Controllers.getHelloWolrd)

export default router
