import express from "express";
import AuthRoutes from "./AuthRoute.js";
import OrderRoutes from "./OrderRoute.js";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/orders", OrderRoutes);

export default router;