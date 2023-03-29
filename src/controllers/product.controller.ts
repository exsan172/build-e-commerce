import { Response, Request, NextFunction } from "express"
import moment from "moment-timezone"
import productService from "../services/product.service"
import config from "../configs/index.config"
import { deleteFile } from "../middlewares/upload.middleware"

const ProductController = {
    getProduct : async (req:Request, res:Response, next:NextFunction) => {
        try {

            const product = await productService.getProduct({ kinds : req.query.kinds })
            return config.response(res, 200, true, "sukses mengambil data produk", product)

        } catch (error) {
            return config.response(res, 400, true, error.message)
        }
    },
    createProduct : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const create = await productService.createProduct({
                product_name    : req.body.product_name,
                price           : req.body.price,
                description     : req.body.description,
                kinds           : req.body.kinds,
                images          : [
                    {
                        name      : req.body.fileName,
                        url       : req.body.fileUrl,
                        public_id : req.body.public_id
                    }
                ]
            })

            return config.response(res, 201, true, "sukses membuat produk", create)
        } catch (error) {
            return config.response(res, 400, true, error.message)
        }
    },
    deleteProduct : async (req:Request, res:Response, next:NextFunction) => {
        try {

            const findData = await productService.getOneProduct(req.query.id as string)
            if(findData === null) {
                return config.response(res, 400, false, "data produk tidak di temukan", [], [
                    {
                        field : "id",
                        message : `data produk dengan ${req.query.id} tidak di temukan`
                    }
                ])
            }

            if(await deleteFile(findData.images[0].public_id)) {
                await productService.deletetProduct(req.query.id as string)
                return config.response(res, 200, true, "sukses menghapus data produk")

            } else {
                return config.response(res, 400, false, "gagal hapus data produk")
            }

        } catch (error) {
            return config.response(res, 400, true, error.message)
        }
    },
    updateProduct : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const findData = await productService.getOneProduct(req.query.id as string)
            if(findData === null) {
                return config.response(res, 400, false, "data produk tidak di temukan", [], [
                    {
                        field : "id",
                        message : `data produk dengan ${req.query.id} tidak di temukan`
                    }
                ])
            }

            let dataProduct = {
                product_name    : req.body.product_name,
                price           : req.body.price,
                description     : req.body.description,
                kinds           : req.body.kinds,
                updated_at      : moment().tz("Asia/Jakarta")
            }

            if(req.file !== undefined) {
                if(await deleteFile(findData.images[0].public_id)) {
                    dataProduct["images"] = [
                        {
                            name      : req.body.fileName,
                            url       : req.body.fileUrl,
                            public_id : req.body.public_id
                        }
                    ]
                }
            }
            
            await productService.updateProduct(req.query.id as string, dataProduct)
            const latestData = await productService.getOneProduct(req.query.id as string)
            
            return config.response(res, 201, true, "sukses update produk", latestData)

        } catch (error) {
            return config.response(res, 400, true, error.message)
        }
    },
}

export default ProductController