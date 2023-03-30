import orderModelSchema from "../models/order.model.schema"

const orderService = {
    getOrder : async (query:object) => {
        return await orderModelSchema.find(query)
    },
    getOneOrder : async (id:string) => {
        return await orderModelSchema.findOne({ _id:id })
    },
    deletetOrder : async (id:string) => {
        return await orderModelSchema.deleteOne({ _id:id })
    },
    createOrder : async (data:object) => {
        return await orderModelSchema.create(data)
    },
    updateOrder : async (id:string, data:object) => {
        return await orderModelSchema.updateOne({ _id: id }, data)
    }
}

export default orderService