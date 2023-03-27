import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notification: {
        type    : String,
        require : true
    },
    read : {
        type    : Boolean,
        require : true,
        default : false
    },
    created_at: {
        type    : Date,
        require : true
    },
    updated_at: {
        type    : Date,
        default : null
    }
})

export default mongoose.model("notification", notificationSchema)