
import express from 'express';

import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { creatWishlistCtrl,
    deleteWishlistCtrl,
    getSingleWishlistCtrl,
    getAllWishlistCtrl,
    updateWishlistCtrl,
 } from '../controllers/wishlistCtrl.js';


const wishlistRouter = express.Router();

wishlistRouter.post('/', isLoggedIn, creatWishlistCtrl);
wishlistRouter.get('/',getAllWishlistCtrl );
wishlistRouter.get('/:id', getSingleWishlistCtrl );
wishlistRouter.delete('/:id',isLoggedIn,deleteWishlistCtrl  );
wishlistRouter.put('/:id',isLoggedIn,updateWishlistCtrl );



export default wishlistRouter;
