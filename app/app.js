import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import dbConnect from '../config/dbConnect.js';
import userRoutes from '../routes/userRoute.js';
import { globalErrHandler , notFound } from '../middlewares/globalErrHandler.js';
import productsRouter from '../routes/productsRoute.js';
import categoriesRouter from '../routes/categoriesRouter.js';
import brandsRouter from '../routes/brandsRoute.js';
import colorsRouter from '../routes/colorRoute.js';
import reviewsRouter from '../routes/reviewRouter.js';
import orderRouter from '../routes/ordersRouter.js';
import couponsRouter from '../routes/CouponsRouter.js';
import wishlistRouter from '../routes/WishlistRouter.js';



dbConnect();   
const app = express();
app.use(express.json())
app.use("/api/v1/users", userRoutes )
app.use("/api/v1/products", productsRouter )
app.use("/api/v1/categories", categoriesRouter ) 
app.use("/api/v1/brands", brandsRouter )
app.use("/api/v1/colors", colorsRouter )
app.use("/api/v1/reviews", reviewsRouter )
app.use("/api/v1/orders", orderRouter )
app.use("/api/v1/coupons", couponsRouter )
app.use("/api/v1/wishlist", wishlistRouter )


 




app.use(notFound);
app.use(globalErrHandler);
 
export default app;

