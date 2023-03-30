import notificationModelSchema from "../models/notification.model.schema"

const notificationService = {
    getNotification : async (query:object) => {
        return notificationModelSchema.find(query)
    },
    deletetNotification : async (id:string) => {
        return notificationModelSchema.deleteOne({ _id:id })
    },
    createNotification : async (data:object) => {
        return notificationModelSchema.create(data)
    },
    updateNotification : async (id:string, data:object) => {
        return notificationModelSchema.updateOne({ _id:id }, data)
    }
}

export default notificationService