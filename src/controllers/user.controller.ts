import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import userService from "../services/user.service"
import config from "../configs/index.config"
import { signJwt } from "../middlewares/jwt.middleware"

const saltRound:number = 10
const userControllers = {
    login : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const findEmail = await userService.getOne({ email : req.body.email })
            if(findEmail === null) {
                return config.response(res, 400, false, "email tidak di temukan", [], [
                    {
                        field   : "email",
                        message : "email tidak di temukan"
                    }
                ])

            } else {
                const comparePassword = bcrypt.compareSync(req.body.password, findEmail.password)
                if(comparePassword) {
                    const sign = await signJwt({
                        name : findEmail.name,
                        role : findEmail.role,
                        id_user : findEmail._id
                    })

                    return config.response(res, 200, true, "sukses masuk", {
                        token : sign,
                        data  : findEmail
                    })

                }
            }

            
        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    register : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const findEmail = await userService.getOne({ email : req.body.email })
            if(findEmail !== null) {
                return config.response(res, 400, false, "email sudah di gunakan", [], [
                    {
                        field : "email",
                        message : "email sudah di gunakan"
                    }
                ])
            }

            const hashPassword = bcrypt.hashSync(req.body.password, saltRound)
            const regis = await userService.createUser({
                name        : req.body.name,
                email       : req.body.email,
                password    : hashPassword,
                role        : req.body.role,
                fcm_token   : req.body.fcm_token,
            })

            if(regis) {
                const sign = await signJwt({
                    name : req.body.name,
                    role : req.body.role,
                    id_user : regis._id,
                })

                return config.response(res, 201, true, "sukses registrasi", {
                    token : sign,
                    data  : regis
                })
            }

        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    }
}

export default userControllers