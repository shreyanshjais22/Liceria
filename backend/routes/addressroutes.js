import express from 'express';
import { addAddress, deleteAddress, getAddress } from '../controllers/addressControllers.js';
import authUser from '../middleware/authuser.js';

const addressRouter = express.Router();

addressRouter.post('/add',authUser,addAddress);

addressRouter.get("/get/:userId",authUser,getAddress);
addressRouter.delete("/:id", authUser, deleteAddress);

export default addressRouter;