import z from "zod";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserRole = {
    GUEST: "GUEST",
    ADMIN: "ADMN",
    USER: "USER",
};

export const loginSchema = z
    .object({
        email: z
            .string()
            .email({ message: "Invalid email format" })
            .regex(emailRegex, { message: "Invalid email format" }),
        password: z.string().min(8),
    })
    .strict();

export const registerSchema = z
    .object({
        email: z.string().email({ message: "Invalid email format" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
        username: z.string().min(2),
        role: z.enum([UserRole.GUEST, UserRole.ADMIN, UserRole.USER], {
            message: "Invalid user role",
        }),
    })
    .strict();

export const productSchema = z.object({
    name: z.string().min(2),
    description: z.string().min(10),
    price: z.number().positive(),
    image: z.string().url(),
    course_outline: z.string().min(2),
});

export const cartSchema = z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive().optional(),
});
