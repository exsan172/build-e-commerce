/*
    config file, edit this file to write your config
*/

import { Response } from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

interface ErrorData {
    field   : string,
    message : string
}

dotenv.config()
const config = {
    env: process.env,
    response: (res:Response, statusCode:number, success:boolean, message:string="", data:object=[], errors:Array<ErrorData>=[]) => {
        let dataJson = {
            statusCode,
            success,
            message,
            data,
            errors,
        }
        
        return res.status(statusCode).json(dataJson)
    },
    dbConnection : async () => {
        try {
            await mongoose.connect(config.env.DB_HOST, { dbName: config.env.DB_NAME })
            console.log("connection database success.");
            
        } catch (error) {
            console.log("connection database failed. ", error);
        }
    }
}

export default config
