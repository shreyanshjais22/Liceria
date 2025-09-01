import { Schema } from "mongoose";
import mongoose  from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems:{type:Object , default:{}},
    address: { type: String, default: "" },
    profilePic: { type: String, default: "" } 
},{minimize: false, timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
