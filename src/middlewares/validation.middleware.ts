import config from '../configs/index.config';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { deleteFile } from './upload.middleware';

const validationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    let message = []
    errors.array().map((data) => {
        message.push({ 
            field : data.param,
            message : data.msg
        })
    })
    
    if(req.body.public_id !== undefined) {
        await deleteFile(req.body.public_id)
    }
    
    return config.response(res, 442, false, "validasi input", [], message)
};

export default validationMiddleware;
