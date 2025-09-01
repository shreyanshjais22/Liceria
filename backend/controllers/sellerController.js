import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";
import Seller from "../models/sellerSchema.js";

// api/seller/register
export const sellerRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ success: false, message: "Seller already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save seller
    const seller = await Seller.create({ name, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ email: seller.email, id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      seller: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error("Error in seller register:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Login 

// api/seller/login
export const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, seller.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ email: seller.email, id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Seller logged in successfully",
      seller: { id: seller._id, name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error("Error in seller login:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//api/seller/is-Auth
export const isSellerAuth = async (req, res, next) => {
    try{
        return res.status(200).json({ success: true,message: "Seller is authenticated" });
    }
    catch (error) {
        console.error("Error in isAuthenticated:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Logout user : api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
        });
        return res.status(200).json({ success: true, message: " logged out successfully" });
    } catch (error) {
        console.error("Error in user logout:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

