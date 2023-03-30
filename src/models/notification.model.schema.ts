import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: {
        type    : String,
        require : true
    },
    read : {
        type    : Boolean,
        require : true,
        default : false
    },
    for_user : {
        type    : String,
        require : true
    },
    created_at: {
        type    : Date,
        require : true,
        default : Date.now
    },
    updated_at: {
        type    : Date,
        default : null
    }
})

export default mongoose.model("notification", notificationSchema)