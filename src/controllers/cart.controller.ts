import { Response, Request, NextFunction } from "express"
import moment from "moment-timezone"
import cartService from "../services/cart.service"
import productService from "../services/product.service"
import config from "../configs/index.config"

const CartController = {
    getCart : async (req:Request, res:Response, next:NextFunction) => {
        try {
            let total = 0
            const cart = await cartService.getCart({})

            for(const i in cart) {
                total += cart[i].total_price
            }

            return config.response(res, 200, true, "sukses mengambil data", {
                cart_data : cart,
                total_price : total
            })

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    countCart : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const count = await cartService.countCart(req.body.dataAuth.id_user)
            return config.response(res, 200, true, "sukses mengambil data", {
                total_cart : count
            })
        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    createCart : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const checkRole = req.body.dataAuth.role
            if(checkRole === "admin") {
                return config.response(res, 400, false, "hanya user yang bisa membuat cart")
            }

            const getProduct = await productService.getOneProduct(req.body.product)
            if(getProduct === null) {
                return config.response(res, 400, false, "data tidak di temukan", [], [
                    {
                        field : "product",
                        message : `data dengan id ${req.body.product} tidak di temukan`
                    }
                ])
            }
            
            const create = await cartService.createCart({
                product     : getProduct,
                qty         : 1,
                total_price : getProduct.price,
                created_by  : req.body.dataAuth.id_user
            })
            return config.response(res, 201, true, "sukses membuat data", create)

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    updateCart : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const checkRole = req.body.dataAuth.role
            if(checkRole === "admin") {
                return config.response(res, 400, false, "hanya user yang bisa mengupdate cart")
            }

            if(req.body.qty < 1) {
                return config.response(res, 400, false, "minimal qty tidak valid", [], [
                    {
                        field : "qty",
                        message : `minimal qty adalah 1`
                    }
                ])
            }

            const checkCart = await cartService.getOneCart(req.query.id as string)
            if(checkCart === null) {
                return config.response(res, 400, false, "data tidak di temukan", [], [
                    {
                        field : "id",
                        message : `data dengan id ${req.query.id} tidak di temukan`
                    }
                ])
            }

            await cartService.updateCart(req.query.id as string, {
                qty : req.body.qty,
                total_price : checkCart.product.price*req.body.qty,
                update_at : moment().tz("Asia/Jakarta")
            })

            const latestData = await cartService.getOneCart(req.query.id as string)
            return config.response(res, 200, true, "sukses update data", latestData)

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    deleteCart : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const checkRole = req.body.dataAuth.role
            if(checkRole === "admin") {
                return config.response(res, 400, false, "hanya user yang bisa menghapus cart")
            }

            const checkCart = await cartService.getOneCart(req.query.id as string)
            if(checkCart === null) {
                return config.response(res, 400, false, "data tidak di temukan", [], [
                    {
                        field : "id",
                        message : `data dengan id ${req.query.id} tidak di temukan` 
                    }
                ])    
            }

            await cartService.deletetCart(req.query.id as string)
            return config.response(res, 200, true, "sukses hapus data")

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    }
}

export default CartController