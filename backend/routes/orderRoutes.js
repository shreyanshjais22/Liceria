import express from "express";
import authUser from "../middleware/authuser.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authSeller } from "../middleware/authSeller.js";

const orderRouter = express.Router();

// User routes
orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.get("/user/:userId", authUser, getUserOrders);

// Seller routes
orderRouter.get("/seller", authSeller, getAllOrders);
orderRouter.put("/:orderId/status", authSeller, updateOrderStatus); // 👈 new route

export default orderRouter;
