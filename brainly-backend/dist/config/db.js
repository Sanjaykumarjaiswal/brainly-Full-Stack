"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.UserModel = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const connectDB = () => {
    return mongoose_1.default.connect("mongodb+srv://skj028280:7pgSD7BFUYYOvXzf@cluster0.z2b8ilf.mongodb.net/brainlyy");
};
exports.connectDB = connectDB;
const UserSchema = new mongoose_2.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true }
});
exports.UserModel = (0, mongoose_2.model)("Users", UserSchema);
const ContentSchema = new mongoose_2.Schema({});
exports.ContentModel = (0, mongoose_2.model)("Contents", ContentSchema);
