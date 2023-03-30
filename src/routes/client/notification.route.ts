import express from "express"
import Controllers from "../../controllers/notification.controller"
import authToken from "../../middlewares/jwt.middleware"

const router = express.Router()

router.get("/notification", authToken, Controllers.getNotification)
router.get("/notification-indicator", authToken, Controllers.getNotificationIndicator)
router.put("/notification", authToken, Controllers.readNotif)

export default router
