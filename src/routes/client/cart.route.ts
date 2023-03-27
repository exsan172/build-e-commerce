/*
    routes file, edit this file to write your routes
*/

import express from "express"
import Controllers from "../../controllers/notification.controller"

const router = express.Router()

router.get("/cart", Controllers.getHelloWolrd)
router.delete("/cart", Controllers.getHelloWolrd)
router.post("/cart", Controllers.getHelloWolrd)
router.put("/cart", Controllers.getHelloWolrd)

export default router
