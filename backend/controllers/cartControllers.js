import User from "../models/userSchema.js";
import mongoose from "mongoose";
export const updateCart = async (req, res) => {
    try{
        const {userId,cartItems} = req.body;
        if(!userId || !cartItems) {
            return res.status(400).json({message: "User ID and cart items are required"});
        }
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({success:true, message: "Cart updated successfully"});
    }catch(error) {
        console.error("Error updating cart:", error);
        res.status(500).json({success:false, message: "Internal server error"});
    }
}