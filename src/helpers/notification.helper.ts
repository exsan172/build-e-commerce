import admin from "firebase-admin"

const sendNotification = async (token:string, title:string, body:string) => {
    try {
        admin.initializeApp({
            credential  : admin.credential.cert("../configs/serviceAccountKey.json")
        })
    
        const message = {
            notification: {
                title: title,
                body: body,
            },
            token: token,
        };

        await admin.messaging().send(message)
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

export default sendNotification