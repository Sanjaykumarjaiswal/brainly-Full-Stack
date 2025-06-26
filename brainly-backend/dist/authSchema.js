"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const v4_1 = require("zod/v4");
exports.signUpSchema = v4_1.z.object({
    username: v4_1.z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(20, { message: "Username must not exceed 20 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
    password: v4_1.z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(50, { message: "Password must not exceed 50 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
});
