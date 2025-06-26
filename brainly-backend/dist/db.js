"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const connectDB = () => {
    return mongoose_1.default.connect("mongodb+srv://skj028280:7pgSD7BFUYYOvXzf@cluster0.z2b8ilf.mongodb.net/brainlyy");
};
exports.connectDB = connectDB;
const contentTypes = ['images', 'video', 'article', 'audio'];
//it is to be used in contentTable in tags as enum
const UserSchema = new mongoose_2.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, unique: true, required: true }
}, {
    timestamps: true
});
const ContentSchema = new mongoose_2.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tags' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'Users' }
}, {
    timestamps: true
});
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, required: true, unique: true, ref: "Users" }
}, {
    timestamps: true
});
exports.UserModel = (0, mongoose_2.model)("Users", UserSchema);
exports.ContentModel = (0, mongoose_2.model)("Contents", ContentSchema);
exports.LinkModel = (0, mongoose_2.model)("Links", LinkSchema);
