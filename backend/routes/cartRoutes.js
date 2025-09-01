import mongoose from "mongoose";
import authUser from "../middleware/authuser.js";
import { updateCart } from "../controllers/cartControllers.js";
import express from "express";

const cartRouter = express.Router();
cartRouter.post("/update",authUser,updateCart)

export default cartRouter;