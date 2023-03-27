import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import config from "../configs/index.config";

export const signJwt = async (payload:any) => {
    return jwt.sign(payload, config.env.PRIVATE_KEY)
}

const authToken = async (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers['authorization']
    const token      = authHeader && authHeader.split(' ')[1]
    
    if(token === null) {
        return config.response(res, 401, false, "unauthorize")
    }

    jwt.verify(token, config.env.PRIVATE_KEY, (err : any, user : any) => {
        if (err) return config.response(res, 401, false, "unauthorize")
        req.body.user = ""

        next()
    })
}

export default authToken