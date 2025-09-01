import express from "express";
import { addProduct, productList, productById, changeStock } from "../controllers/productController.js";
import { upload } from "../config/multer.js";
import { authSeller } from "../middleware/authSeller.js";

const productRouter = express.Router();

productRouter.post("/add", upload.array("images",4), authSeller, addProduct);
productRouter.get("/list", productList);   
productRouter.post("/byid", productById);
productRouter.post("/changestock", authSeller, changeStock);

export default productRouter;
