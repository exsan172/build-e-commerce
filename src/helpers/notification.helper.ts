import admin from "firebase-admin"
import * as firebaseConfig from "../configs/serviceAccountKey.json"

admin.initializeApp({
    credential  : admin.credential.cert(firebaseConfig as any)
})

const sendNotification = async (token:string, title:string, body:string) => {
    try {    
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
        console.log("error notif => ", error.message);
        
        return {
            status  : false,
            message : error.message
        }
    }
}

export default sendNotification