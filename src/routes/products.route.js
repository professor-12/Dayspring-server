import express from "express";
import {
    getAllProducts,
    getProductById,
} from "../controllers/products.controllers.js";
import catchasync from "../handleerror/catchasync.js";
const route = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Product not found
 */

// Routes
route.get("/", catchasync(getAllProducts));
// route.get("/:id", catchasync(getProductById));

export default route;
