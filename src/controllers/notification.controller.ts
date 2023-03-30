import { Response, Request, NextFunction } from "express"
import config from "../configs/index.config"
import notificationService from "../services/notification.service"

const notificationController =  {
    getNotification: async (req:Request, res:Response, next:NextFunction) => {
        try {
            const notif = await notificationService.getNotification({ for_user : req.body.dataAuth.id_user })
            return config.response(res, 200, true, "sukses mengambil data notifikasi", notif)

        } catch (error) {
            return config.response(res, 400, error.message)
        }
    },
    getNotificationIndicator: async (req:Request, res:Response, next:NextFunction) => {
        try {
            const notif = await notificationService.getNotification({ for_user : req.body.dataAuth.id_user, read : false })
            return config.response(res, 200, true, "sukses mengambil data notifikasi", {
                indicator : notif.length > 0 ? true : false
            })

        } catch (error) {
            return config.response(res, 400, error.message)
        }
    },
    readNotif : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const findNotif = await notificationService.getNotification({ for_user : req.body.dataAuth.id_user })
            if(findNotif === null) {
                return config.response(res, 400, false, "data notif tidak ada sekarang")
            }

            const readAll = await notificationService.updateManyNotification({ for_user : req.body.dataAuth.id_user }, { read : true })
            if(readAll) {
                return config.response(res, 200, true, "sukses notif berhasil di update")
            }

        } catch (error) {
            return config.response(res, 400, error.message)
        }
    }
}

export default notificationController