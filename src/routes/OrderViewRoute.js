import express from "express";
import {
    renderOrders,
    renderCreateOrder,
    handleCreateOrder,
    renderUpdateOrder,
    handleUpdateOrder,
    handleDeleteOrder
} from "../controller/OrderView.controller.js";
import { authenticateView, authorizeView } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Tất cả trang order đều yêu cầu đăng nhập
router.use(authenticateView);

router.get("/", renderOrders);

router.get("/create", renderCreateOrder);

router.post("/create", handleCreateOrder);

router.get("/update/:id", authorizeView("admin"), renderUpdateOrder);

router.post("/update/:id", authorizeView("admin"), handleUpdateOrder);

router.post("/delete/:id", authorizeView("admin"), handleDeleteOrder);

export default router;
