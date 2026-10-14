import express from "express";

import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
} from "../controller/Order.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Tất cả route order đều yêu cầu đăng nhập
router.use(authenticate);

router.get("/", getOrders);

router.post("/", createOrder);

router.get("/:id", getOrderById);

router.put("/:id", authorize("admin"), updateOrder);

router.delete("/:id", authorize("admin"), deleteOrder);

export default router;