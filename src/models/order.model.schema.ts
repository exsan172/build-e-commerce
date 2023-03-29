import mongoose from "mongoose";

interface ProductInterface {
    product     : object,
    qty         : number,
    total_price : number,
    created_by  : string,
    created_at  : Date,
    updated_at  : Date | null
}

const orderSchema = new mongoose.Schema({
    product: {
        type    : Array<ProductInterface>,
        require : true
    },
    total_price: {
        type    : String,
        require : true
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
        require : true
    },
    updated_at: {
        type    : Date,
        default : null
    }
})

export default mongoose.model("order", orderSchema)