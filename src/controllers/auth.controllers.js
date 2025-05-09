import { loginSchema, registerSchema } from "../schema/zod.js";
import { login, signIn } from "../service/auth.service.js";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.js";

export const signupControllers = async (req, res) => {
    // const { error } = registerSchema.safeParse(req.body);

    throw new Error("All fields are required");

    // await signIn(data, res);
};
export const loginControllers = async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({
            message: "No data provided",
        });
    }
    loginSchema.safeParse(data);
    await login(data, res);
};

export const getUserDetails = async (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No auth token Provided",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid auth token" });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        delete user.password;
        return res.status(200).json({
            message: "User found",
            data: { ...user, ...decoded },
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Invalid auth token",
        });
    }
};

export const createProduct = async () => {};
