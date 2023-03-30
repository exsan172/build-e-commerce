import { Response, Request, NextFunction } from "express"
import moment from "moment-timezone"
import orderService from "../services/order.service"
import cartService from "../services/cart.service"
import config from "../configs/index.config"

const orderController = {
    getOrder : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const order = await orderService.getOrder({ created_by: req.body.dataAuth.id_user })
            return config.response(res, 200, true, "sukses mengambil data order", order)

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    getOrderByStatus : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const order = await orderService.getOrder({ created_by: req.body.dataAuth.id_user, order_status: req.query.status === "open" ? false : true })
            return config.response(res, 200, true, "sukses mengambil data order", order)

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    createOrder : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const getDataCart = await cartService.getCart({ created_by: req.body.dataAuth.id_user })
            if(getDataCart.length > 0) {
                let listId:Array<any>     = []
                let totalPrice:number     = 0
    
                for(const i in getDataCart) {
                    listId.push(getDataCart[i]._id)
                    totalPrice += getDataCart[i].total_price
                }
    
                const deleteCart = await cartService.deletetManyCart(listId)
                if(deleteCart) {
                    const order = await orderService.createOrder({
                        product     : getDataCart,
                        total_price : totalPrice,
                        created_by  : req.body.dataAuth.id_user
                    })
    
                    return config.response(res, 200, true, "sukses membuat order baru", order)
                }

            } else {
                return config.response(res, 400, false, "data cart tidak di temukan")
            }
            
        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    detailOrder : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const detail = await orderService.getOneOrder(req.query.id as string)
            if(detail === null) {
                return config.response(res, 400, false, "data order tidak di temukan", [], [
                    {
                        field : "id",
                        message : `data dengan id ${req.query.id} tidak di temukan`
                    }
                ])

            } else {
                return config.response(res, 200, true, "sukses mengambil data order", detail)
            }
        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    updateOrder : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const checkOrder = await orderService.getOneOrder(req.query.id as string)
            if(checkOrder === null) {
                return config.response(res, 400, false, "data order tidak di temukan", [], [
                    {
                        field : "id",
                        message : `data dengan id ${req.query.id} tidak di temukan`
                    }
                ])
            }

            let orderData = {
                updated_at   : moment().tz("Asia/Jakarta")
            }

            if(req.body.order_status !== undefined) {
                orderData["order_status"] = req.body.order_status
            }

            if(req.body.pay_status !== undefined) {
                orderData["pay_status"] = req.body.pay_status
            }

            await orderService.updateOrder(req.query.id as string, orderData)
            const latestData = await orderService.getOneOrder(req.query.id as string)
            
            return config.response(res, 200, true, "sukses update data order", latestData)

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    }
}

export default orderController