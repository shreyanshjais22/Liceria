import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    offerPrice: {type: Number, required: true},
    description: {type: Array, required: true},
    category: {type: String, required: true},
    image: {type: Array, required: true},
    inStock: {type: Boolean, required: true, default: true},
    ratings: {type: Number, default: 0},
},{timestamps: true });

export const Product = mongoose.model("Product", productSchema);
