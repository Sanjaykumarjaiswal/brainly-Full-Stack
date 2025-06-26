"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = userAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function userAuth(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.status(403).json({
            message: "Access Denied. Invalid or expired Token"
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({
                message: "Access Denied. Invalid token or token expired"
            });
            return;
        }
        req.user = user;
        next();
    });
}
