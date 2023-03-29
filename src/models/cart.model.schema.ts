import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product: {
        type    : Object,
        require : true
    },
    qty: {
        type    : Number,
        require : true
    },
    total_price: {
        type    : Number,
        require : true
    },
    created_by: {
        type    : String,
        require : true
    },
    created_at: {
        type    : Date,
        default : Date.now,
        require : true
    },
    updated_at: {
        type    : Date,
        default : null
    }
})

export default mongoose.model("cart", cartSchema)