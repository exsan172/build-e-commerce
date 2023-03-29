import userModelSchema from "../models/user.model.schema"

const userService = {
    getUser : async () => {
        return await userModelSchema.find({})
    },
    getOne : async (query:object) => {
        return await userModelSchema.findOne(query)
    },
    deletetUser : async (id:string) => {
        return await userModelSchema.deleteOne({ __id : id })
    },
    createUser : async (data:object) => {
        return await userModelSchema.create(data)
    },
    updateUser : async (id:string, data:object) => {
        return await userModelSchema.updateOne({ __id: id }, data)
    }
}

export default userService