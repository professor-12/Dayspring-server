import prisma from "../../prisma/prisma.js";
import { productSchema } from "../schema/zod.js";

export async function getAllProducts(req, res, next) {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.status(200).json(products);
}

export async function getProductById(req, res, next) {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
        where: { id },
    });
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
}

export async function createProduct(req, res, next) {
    productSchema.parse(req.body);
    const { name, description, price, course_outline, image, categories } =
        req.body;
    const product = await prisma.product.create({
        data: { name, description, price, image, course_outline, categories },
    });
    res.status(201).json(product);
}
