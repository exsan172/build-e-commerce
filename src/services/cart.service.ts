import cartModelSchema from "../models/cart.model.schema"

const cartService = {
    getCart : async (query:object) => {
        return await cartModelSchema.find(query)
    },
    getOneCart : async (id:string) => {
        return await cartModelSchema.findOne({ _id:id })
    },
    deletetCart : async (id:string) => {
        return await cartModelSchema.deleteOne({ _id:id })
    },
    deletetManyCart : async (id:Array<string>) => {
        return await cartModelSchema.deleteMany({ _id:id })
    },
    createCart : async (data:object) => {
        return await cartModelSchema.create(data)
    },
    updateCart : async (id:string, data:object) => {
        return await cartModelSchema.updateOne({ _id: id }, data)
    },
    countCart : async (idUser:string) => {
        return await cartModelSchema.find({ created_by: idUser }).count()
    },
}

export default cartService