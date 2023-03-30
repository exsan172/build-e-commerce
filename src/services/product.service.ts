import productModelSchema from "../models/product.model.schema"

const productService = {
    getProduct : async (query:any) => {
        return await productModelSchema.find(query)
    },
    getOneProduct : async (id:string) => {
        return await productModelSchema.findOne({ _id : id }).select("_id product_name images price description, kinds")
    },
    deletetProduct : async (id:string) => {
        return await productModelSchema.deleteOne({ _id : id })
    },
    createProduct : async (payload:object) => {
        return await productModelSchema.create(payload)
    },
    updateProduct : async (id:string, data:object) => {
        return await productModelSchema.updateOne({ _id : id }, data)
    }
}

export default productService