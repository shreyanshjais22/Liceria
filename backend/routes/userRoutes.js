import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import { upload } from "../config/multer.js";
import authUser from '../middleware/authuser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login); 
userRouter.get('/is-auth',authUser,isAuth);
userRouter.get('/logout', authUser,logout);
export default userRouter;