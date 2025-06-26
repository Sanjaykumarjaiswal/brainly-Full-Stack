import { z } from "zod/v4"

export const signUpSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(20, { message: "Username must not exceed 20 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(50, { message: "Password must not exceed 50 characters." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
});

export type signUpInput = z.infer<typeof signUpSchema>


