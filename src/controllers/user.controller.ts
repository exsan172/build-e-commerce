import { Request, Response, NextFunction } from "express"
import bcrypt from "bcrypt"
import userService from "../services/user.service"
import config from "../configs/index.config"
import { signJwt } from "../middlewares/jwt.middleware"
import { loginWithGoogle } from "../helpers/notification.helper"

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
                    
                    if(req.body.fcm_token !== undefined && req.body.fcm_token !== "") {
                        if(findEmail.fcm_token !== req.body.fcm_token) {
                            await userService.updateUser(findEmail._id as any, {
                                fcm_token : req.body.fcm_token
                            })
                        }
                    }

                    const latestDataUser = await userService.getOne({ email : req.body.email })
                    const sign = await signJwt({
                        name        : latestDataUser.name,
                        role        : latestDataUser.role,
                        id_user     : latestDataUser._id,
                        fcm_token   : latestDataUser.fcm_token
                    })

                    return config.response(res, 200, true, "sukses masuk", {
                        token : sign,
                        data  : latestDataUser
                    })

                }
            }
            
        } catch (error) {
            return config.response(res, 400, false, error.message)
        }
    },
    loginGoogle : async (req:Request, res:Response, next:NextFunction) => {
        try {
            const dataUser = await loginWithGoogle(req.body.verification_token)
            if(dataUser.status === true) {
                const sign = await signJwt({
                    name        : dataUser.message.name,
                    role        : "user",
                    id_user     : dataUser.message.id_user,
                    fcm_token   : req.body.fcm_token
                })
    
                return config.response(res, 200, true, "sukses masuk", {
                    token : sign,
                    data  : {
                        name        : dataUser.message.name,
                        role        : "user",
                        id_user     : dataUser.message.id_user,
                        fcm_token   : req.body.fcm_token
                    }
                })

            } else {
                return config.response(res, 400, false, dataUser.message)
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
                    fcm_token : req.body.fcm_token
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