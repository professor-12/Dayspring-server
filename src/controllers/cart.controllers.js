import prisma from "../../prisma/prisma.js";
import { cartSchema } from "../schema/zod.js";

export const addToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body || {};
    cartSchema.parse({
        productId,
        quantity,
    });
    console.log("Adding to cart", userId);
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }
    try {
        let cart = await prisma.cart.findFirst({ where: { userId } });
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId,
                    items: {
                        create: { productId, quantity },
                    },
                },
            });
            return res
                .status(201)
                .json({ message: "Cart created and item added." });
        }

        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
            },
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: quantity,
                },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        return res.status(201).json({ message: "Item added to cart." });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: "Something went wrong while adding to cart." });
    }
};

export const getCart = async (req, res) => {
    const userId = req.user.id;
    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }
    try {
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: "Something went wrong while fetching the cart." });
    }
};

export const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    try {
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: true,
            },
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const itemToRemove = cart.items.find(
            (item) => item.productId === productId
        );

        if (!itemToRemove) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        await prisma.cartItem.delete({
            where: { id: itemToRemove.id },
        });

        return res.status(200).json({ message: "Item removed from cart." });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: "Something went wrong while removing from cart." });
    }
};

export const updateCartItem = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    try {
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: true,
            },
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        const itemToUpdate = cart.items.find(
            (item) => item.productId === productId
        );

        if (!itemToUpdate) {
            return res.status(404).json({ message: "Item not found in cart." });
        }

        await prisma.cartItem.update({
            where: { id: itemToUpdate.id },
            data: { quantity },
        });

        return res.status(200).json({ message: "Cart item updated." });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: "Something went wrong while updating cart item." });
    }
};

export const clearCart = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ message: "User not authenticated." });
    }

    try {
        await prisma.cartItem.deleteMany({
            where: { cart: { userId } },
        });

        return res.status(200).json({ message: "Cart cleared." });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ error: "Something went wrong while clearing the cart." });
    }
};
