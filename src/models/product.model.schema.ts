import mongoose from "mongoose";

interface ImagesInterface {
    name : string,
    url  : string,
    public_id : string
}

const productSchema = new mongoose.Schema({
    product_name: {
        type    : String,
        require : true
    },
    images: {
        type    : Array<ImagesInterface>,
        require : true
    },
    price: {
        type    : Number,
        require : true
    },
    description: {
        type    : String,
        require : true
    },
    kinds : {
        type    : String,
        enum    : ["food", "drink"],
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

export default mongoose.model("product", productSchema)