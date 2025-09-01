import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import cloudinaryConfig from './config/cloudinary.js';
import router from './routes/productRoutes.js';
import productRouter from './routes/productRoutes.js';
import addressRouter from './routes/addressroutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import { stripeWebhooks } from './controllers/orderController.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware confriguration
app.use(express.json());
app.use(cookieParser());

app.post('/stripe', express.raw({type: 'application/json'}),stripeWebhooks);
app.use(cors({
    origin: 'https://liceria-lyart.vercel.app',
    credentials: true,}
));

await connectDB();
await cloudinaryConfig();

app.get('/', (req, res) => {
    res.send('Welcme to the Grocery Backen API!');
    }
);

app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter); 
app.use('/api/product',productRouter);
app.use('/api/address', addressRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);
