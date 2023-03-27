import admin from "firebase-admin"

const sendNotificaiton = async (token:string, message:any) => {
    await admin.initializeApp({
        credential  : admin.credential.cert(""),
        databaseURL : ""
    })

    try {
        await admin.messaging().sendToDevice(token, message, {
            priority    : "high",
            timeToLive  : 60 * 60 * 24
        })
        
        return {
            status  : true,
            message : "notifikasi berhasil di kirim." 
        }

    } catch (error) {
        
        return {
            status  : false,
            message : error.message
        }
    }
}

export default sendNotificaiton