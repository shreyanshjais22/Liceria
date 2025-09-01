import jwt from "jsonwebtoken";
import Seller from "../models/sellerSchema.js"; // Import Seller model

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Check if seller exists in DB
    const seller = await Seller.findById(decoded.id).select("-password"); // exclude password
    if (!seller) {
      return res.status(401).json({ success: false, message: "Seller not found" });
    }
    req.seller = seller;
    next();
  } catch (error) {
    console.error("Error in authSeller middleware:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
