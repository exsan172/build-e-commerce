import mongoose from "mongoose";

interface ProductInterface {
    product     : object,
    qty         : number,
    total_price : number,
    created_by  : string
}

const orderSchema = new mongoose.Schema({
    product: {
        type    : Array<ProductInterface>,
        require : true
    },
    total_price: {
        type    : Number,
        require : true
    },
    pay_status: {
        type    : Boolean,
        require : true,
        default : false
    },
    order_status: {
        type    : Boolean,
        require : true,
        default : false
    },
    created_by: {
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

export default mongoose.model("order", orderSchema)