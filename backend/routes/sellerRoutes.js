import express from "express";
import { 
  sellerRegister,   // new controller
  sellerLogin, 
  sellerLogout, 
  isSellerAuth 
} from "../controllers/sellerController.js";
import { authSeller } from "../middleware/authSeller.js";

const sellerRouter = express.Router();

// Register a new seller
sellerRouter.post("/register", sellerRegister);

// Login seller
sellerRouter.post("/login", sellerLogin);

// Logout seller
sellerRouter.get("/logout", sellerLogout);

// Check if seller is authenticated
sellerRouter.get("/is-auth", authSeller, isSellerAuth);

export default sellerRouter;
