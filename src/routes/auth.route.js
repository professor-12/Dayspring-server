import express from "express";
import {
    getUserDetails,
    loginControllers,
    signupControllers,
} from "../controllers/auth.controllers.js";
import catchasync from "../handleerror/catchasync.js";
const route = express.Router();

// Authentication routes
route.post("/register", catchasync(signupControllers));
route.post("/login", catchasync(loginControllers));
route.get("/user-details", catchasync(getUserDetails));

export default route;
