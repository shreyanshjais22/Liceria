import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user : api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "User registration failed" });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//Lodin user : api/user/login
export const login = async (req, res) => {
  console.log("Login route hit");
    try {
        const {email, password } = req.body;
        
        if (!email || !password) {
        return res
            .status(400)
            .json({ success: false, message: "Please fill all the fields" });
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email or password" });
        }
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email or password" });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
        });
        res.cookie("token", token, {
        httpOnly: "true",
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            name: user.name,
            email: user.email,
        },
        });
    } catch (error) {
        console.error("Error in user login:", error);
        return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
}

//check if user is authenticated
export const isAuth = async (req, res) => {
  try {
    const userId = req.userId;  // ✅ comes from authUser middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: "true",
      user,   // ✅ keep consistent with frontend
    });
  } catch (error) {
    console.error("Error in isAuthenticated:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Logout user : api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none", 
        });
        return res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in user logout:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateProfilePic = async (req, res) => {
  try {
    const { userId } = req.body;
    const { url } = req.file; // if using multer-storage-cloudinary
    const user = await User.findByIdAndUpdate(userId, { profilePic: url }, { new: true });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


