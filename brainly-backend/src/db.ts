import mongoose from "mongoose"
import { Schema,model } from "mongoose"
export const connectDB = () =>{
    return mongoose.connect("mongodb+srv://skj028280:7pgSD7BFUYYOvXzf@cluster0.z2b8ilf.mongodb.net/brainlyy")
}
const contentTypes = ['images','video','article','audio']
//it is to be used in contentTable in tags as enum

const UserSchema = new Schema({
    username : {type:String,unique:true,required:true,trim:true},
    password : {type:String,unique:true,required:true}
},{
    timestamps:true
})
const ContentSchema = new Schema({
    title : {type:String,required:true},
    link : {type:String,required:true},
    type:{type:String,required:true},
    tags:[{type:mongoose.Types.ObjectId,ref:'Tags'}],
    userId:{type:mongoose.Types.ObjectId,ref:'Users'}
},{
    timestamps:true
})

const LinkSchema = new Schema({
    hash : String,
    userId : {type : mongoose.Types.ObjectId,required:true,unique:true,ref:"Users"}
},{
    timestamps:true
})
export const UserModel = model("Users",UserSchema)
export const ContentModel = model("Contents",ContentSchema)
export const LinkModel = model("Links",LinkSchema)
