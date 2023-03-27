import mongoose from "mongoose";

interface ImagesInterface {
    name : string,
    url  : string,
    public_id : string
}

interface ProductInterface {
    _id          : string,
    product_name : string,
    images       : Array<ImagesInterface>
    price        : number,
    qyt          : number
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