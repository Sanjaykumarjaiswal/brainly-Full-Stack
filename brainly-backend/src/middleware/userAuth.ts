import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken"
import { JWT_SECRET } from "../config";


// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export function userAuth(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null){
        res.status(403).json({
            message:"Access Denied. Invalid or expired Token"
        })
        return  
    }
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        if(err){
            res.status(403).json({
                message:"Access Denied. Invalid token or token expired"
            })
            return
        }
        req.user = user
        next()
    })
}