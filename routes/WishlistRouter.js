
import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { creatWishlistCtrl } from '../controllers/wishlistCtrl.js';


const wishlistRouter = express.Router();

wishlistRouter.post('/', isLoggedIn, creatWishlistCtrl);


export default wishlistRouter;
