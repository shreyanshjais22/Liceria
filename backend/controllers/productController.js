import {Product} from "../models/productSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const addProduct = async (req, res) => {
    try {
        let productdata = JSON.parse(req.body.productdata);
        const img = req.files
        let imgurl = await Promise.all(
            img.map(async (image) => {
                let res = await cloudinary.uploader.upload(image.path, 
                {resource_type: 'image'});
                return res.secure_url;
            })
        )
        await Product.create({...productdata, image: imgurl});
        return res.status(200).json({ 
            success: "true",
            message: "Product uploaded successfully" });
    }catch (error) {
        console.error("Error uploading product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            success: true,
            message: "Product list fetched successfully",
            products
        });
    } catch (error) {
        console.error("Error fetching product list:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


export const productById = async (req, res) => {
    try{
        const {id} =req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    }catch (error) {
        console.error("Error fetching product by ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const changeStock = async (req, res) => {
  
  try {
    const { id, inStock } = req.body;
    

    const product = await Product.findByIdAndUpdate(id, { inStock });
    

    if (!product) {
      return res.status(404).json({
        success: false, 
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,  
      message: "Stock status updated successfully"
    });
  } catch (error) {
    console.error("Error changing stock status:", error);
    return res.status(500).json({
      success: false,   
      message: "Internal server error"
    });
  }
};
