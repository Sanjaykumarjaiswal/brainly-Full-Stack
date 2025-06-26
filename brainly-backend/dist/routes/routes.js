"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authSchema_1 = require("../authSchema");
const db_1 = require("../db");
const db_2 = require("../db");
const userAuth_1 = require("../middleware/userAuth");
const utils_1 = require("../utils");
const router = express_1.default.Router();
exports.router = router;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = authSchema_1.signUpSchema.safeParse(req.body);
    if (!validationResult.success) {
        res.status(411).json({
            message: "Validation failed",
        });
        return;
    }
    const { username, password } = req.body;
    try {
        const existingUser = yield db_1.UserModel.findOne({
            username: username
        });
        if (existingUser) {
            res.status(403).json({
                message: "User already exists"
            });
            return;
        }
        const hashedPaswword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.UserModel.create({
            username: username,
            password: hashedPaswword
        });
        res.status(200).json({
            message: "signed up successfully"
        });
    }
    catch (error) {
        console.log("error : " + error);
        res.status(500).json({
            message: "Internal server error during signup."
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, password } = req.body;
    try {
        const user = yield db_1.UserModel.findOne({
            username: username
        });
        if (!user) {
            res.status(401).json({
                message: "No user with this username exists"
            });
            return;
        }
        const isUser = yield bcrypt_1.default.compare(password, user.password);
        if (!isUser) {
            res.status(401).json({
                message: "Invalid Password"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: (_a = user._id) === null || _a === void 0 ? void 0 : _a.toString()
        }, config_1.JWT_SECRET);
        res.status(200).json({
            message: "Signin successful",
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Problem"
        });
    }
}));
router.post("/content", userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { link, title, type } = req.body;
    try {
        yield db_2.ContentModel.create({
            title: title,
            link: link,
            type: type,
            userId: userId
        });
        res.status(200).json({
            message: "content uploaded Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Unable to post Content. Some Issue from Server Side"
        });
    }
}));
router.get("/content", userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const content = yield db_2.ContentModel.find({
            userId: userId
        }).populate("userId", "username");
        res.status(200).json({
            content
        });
    }
    catch (error) {
        res.status(500).json({
            message: "sever Issue"
        });
    }
}));
router.delete("/content", userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const contentId = req.body.contentId;
    try {
        const deletedContent = yield db_2.ContentModel.deleteMany({
            _id: contentId,
            userId: userId
        });
        if (deletedContent.deletedCount === 0) {
            res.status(404).json({
                message: "Content not found or access denied"
            });
            return;
        }
        res.status(200).json({
            message: "Content Deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Issue"
        });
    }
}));
router.post("/brain/share", userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share; //it can be true or false
    const userId = req.user.id;
    if (share) {
        try {
            const existingLink = yield db_1.LinkModel.findOne({
                userId: userId
            });
            if (existingLink) {
                res.json({
                    hash: existingLink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(15);
            yield db_1.LinkModel.create({
                hash: hash,
                userId: userId
            });
            res.status(200).json({
                message: "Link generated",
                link: hash
            });
        }
        catch (error) {
            res.status(500).json({
                message: "internal Server Issue"
            });
            return;
        }
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: userId
        });
        res.status(200).json({
            message: "Sharing disabled and link removed"
        });
    }
}));
router.get("/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const link = yield db_1.LinkModel.findOne({
            hash
        });
        if (!link) {
            res.status(411).json({
                message: "Sorry Incorrect Input"
            });
            return;
        }
        const content = yield db_2.ContentModel.find({
            userId: link.userId
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId.toString()
        });
        res.json({
            username: user === null || user === void 0 ? void 0 : user.username,
            content: content
        });
    }
    catch (error) {
        message: "Internal Server Issue";
    }
}));
