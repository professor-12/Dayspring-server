import express from "express";
import catchasync from "../handleerror/catchasync.js";
import {
    addToCart,
    getCart,
    removeFromCart,
} from "../controllers/cart.controllers.js";
import { chechAuth } from "../middleware/auth-middleware.js";
const router = express.Router();

router.post("/addcart", chechAuth, catchasync(addToCart));
router.get("/getcart", chechAuth, catchasync(getCart));
router.delete("/deletecart", chechAuth, catchasync(removeFromCart));

export default router;
