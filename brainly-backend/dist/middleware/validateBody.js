"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const zod_1 = require("zod");
const validateBody = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const errors = error.errors.map(err => ({
                path: err.path.join('.'), // Joins nested paths like    "user.address.street"
                message: err.message
            }));
            return res.status(400).json({
                message: "Validation failed",
                errors: errors
            });
        }
    }
};
exports.validateBody = validateBody;
