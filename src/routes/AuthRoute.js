import express from "express";

import {
    register,
    login,
    logout,
    getProfile
} from "../controller/Auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authenticate, logout);

router.get("/me", authenticate, getProfile);

export default router;
