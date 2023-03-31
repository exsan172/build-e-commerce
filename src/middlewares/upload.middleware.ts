import { Request, Response, NextFunction } from "express"
import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import config from "../configs/index.config"

cloudinary.config({
    cloud_name  : config.env.CLOUD_NAME,
    api_key     : config.env.API_KEY,
    api_secret  : config.env.API_SECRET
});

export const upload = multer({ 
    dest : config.env.FOLDER_NAME,
    limits : { fileSize: 200000 },
    fileFilter : (req, file, callback) => {
        const allowFormat = /jpeg|jpg|png|gif/
        const ext         = allowFormat.test(file.originalname.split('.').pop());
        const mimetype    = allowFormat.test(file.mimetype);

        if (ext && mimetype) {
            callback(null, true);
        } else {
            callback(new Error('hanya file images yang di perbolehkan'));
        }
    }
})

export const uploadMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        if(req.file === undefined) {
            return config.response(res, 400, false, "images tidak valid", [], [
                {
                    field : "images",
                    message : "gambar yang di input tidak valid"
                }
            ])
        }
        
        const result       = await cloudinary.uploader.upload(req.file.path)       
        req.body.fileName  = result.original_filename
        req.body.public_id = result.public_id
        req.body.fileUrl   = result.secure_url

        next()
    } catch (error) {
        console.error(error);
        return config.response(res, 500, false, error)
    }
}

export const fileError = async (err:Error ,req:Request, res:Response, next:NextFunction) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return config.response(res, 400, false, "ukuran gambar terlalu besar", [] , [
            {
                field : "images",
                message : "ukuran gambar terlalu besar, maksimal 200kb"
            }
        ])

    } else if(err.message !== "" || err.message !== undefined) {
        return config.response(res, 400, false, err.message, [] , [
            {
                field : "images",
                message : err.message
            }
        ])

    } else {
        next(err);
    }
}

export const deleteFile = async (publicId:string) => {
    try {
        await cloudinary.uploader.destroy(publicId);
        return true
        
    } catch (error) {
        return false
    }
}