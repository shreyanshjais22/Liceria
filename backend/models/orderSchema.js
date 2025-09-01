import mongoose from "mongoose";
import { Product } from "./productSchema.js";
import { Address } from "./addressSchema.js";
import User  from "./userSchema.js";


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      quantity: { type: Number, required: true },
    }
  ],
  amount: { type: Number, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Address" },
  status: { type: String, default: "pending" },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
