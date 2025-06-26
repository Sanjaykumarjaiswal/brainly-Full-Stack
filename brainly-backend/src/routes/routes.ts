import express from 'express'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import type { Request, Response } from 'express'
import { JWT_SECRET } from '../config'
import { signUpSchema } from '../authSchema'
import { LinkModel, UserModel } from '../db'
import { ContentModel } from '../db'
import { userAuth } from '../middleware/userAuth'
import { random } from '../utils'
import cors from "cors"
const router = express.Router()

router.post("/signup", async (req:Request,res:Response)=>{
    const validationResult = signUpSchema.safeParse(req.body as unknown)
    if(!validationResult.success){
        res.status(411).json({
            message : "Validation failed",
        })
        return
    }
    const { username,password } = req.body
    try{
        const existingUser = await UserModel.findOne({
            username:username
        })
        if(existingUser){
            res.status(403).json({
                message:"User already exists"
            })
            return
        }
        const hashedPaswword = await bcrypt.hash(password,10)

        await UserModel.create({
            username:username,
            password:hashedPaswword
        })
        res.status(200).json({
            message:"signed up successfully"
        })
    } catch (error) {
        console.log("error : " + error);
        res.status(500).json({ 
            message: "Internal server error during signup." 
        });
    }
})

router.post("/signin", async (req: Request, res: Response) => {
    const { username, password } = req.body
    try{
        const user = await UserModel.findOne({
            username:username
        })
        if(!user){
            res.status(401).json({
                message:"No user with this username exists"
            })
            return
        }
        const isUser = await bcrypt.compare(password,user.password)
        if(!isUser){
            res.status(401).json({
                message:"Invalid Password"
            })
            return
        }
        const token = jwt.sign({
            id:user._id?.toString()
        },JWT_SECRET)
        res.status(200).json({
            message:"Signin successful",
            token:token
        })
    }catch(error){
        res.status(500).json({
            message:"Internal Server Problem"
        })
    }
    
})

router.post("/content",userAuth, async (req: Request, res: Response) => {
    const userId = req.user.id
    const { link,title,type } = req.body
    try{
        await ContentModel.create({
            title:title,
            link:link,
            type:type,
            userId:userId
        })
        res.status(200).json({
            message:"content uploaded Successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Unable to post Content. Some Issue from Server Side"
        })
    }
})

router.get("/content",userAuth, async (req: Request, res: Response) => {
    const userId = req.user.id
    try{
        const content = await ContentModel.find({
            userId:userId
        }).populate("userId","username")
        res.status(200).json({
            content
        })
    }catch(error){
        res.status(500).json({
            message:"sever Issue"
        })
    }
    


})

router.delete("/content",userAuth, async (req: Request, res: Response) => {
    const userId = req.user.id
    const contentId = req.body.contentId;
    
    try{
        const deletedContent = await ContentModel.deleteMany({
            _id: contentId,
            userId: userId
        })
        if(deletedContent.deletedCount === 0){
            res.status(404).json({
                message:"Content not found or access denied"
            })
            return
        }
        res.status(200).json({
            message:"Content Deleted"
        })
    }catch(error){
        res.status(500).json({
            message:"Internal Server Issue"
        })
    }
    
})
router.post("/brain/share",userAuth, async (req:Request,res:Response)=>{
    const share = req.body.share//it can be true or false
    const userId = req.user.id
    if(share){
        try{
            const existingLink = await LinkModel.findOne({
                userId:userId
            })
            if(existingLink){
                res.json({
                    hash : existingLink.hash
                })
                return
            }

            const hash = random(15)
            await LinkModel.create({
                hash : hash,
                userId:userId
            })
            res.status(200).json({
                message:"Link generated",
                link : hash
            })
        }catch(error){
            res.status(500).json({
                message:"internal Server Issue"
            })
            return
        }
    }else{
        await LinkModel.deleteOne({
            userId : userId
        })
        res.status(200).json({
            message: "Sharing disabled and link removed"
        });
    }
})
router.get("/brain/:shareLink",async (req:Request,res:Response)=>{
    const hash = req.params.shareLink
    try{
        const link = await LinkModel.findOne({
            hash
        })
        if(!link){
            res.status(411).json({
                message : "Sorry Incorrect Input"
            })
            return
        }
        const content = await ContentModel.find({
            userId : link.userId
        })
        const user = await UserModel.findOne({
            _id : link.userId.toString()
        })
        
        res.json({
            username : user?.username,
            content : content
        })
    }catch(error){
        message : "Internal Server Issue"
    }
})

export { router }

