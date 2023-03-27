import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type    : String,
        require : true
    },
    email: {
        type    : String,
        require : true
    },
    password: {
        type    : String,
        require : true
    },
    fcm_token: {
        type    : String,
        require : true
    },
    role: {
        type    : String,
        require : true,
        default : "user",
        enum    : ["admin", "user"]
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

export default mongoose.model("user", userSchema)