import asyncHandler from "express-async-handler";
import Wishlist from "../model/Wishlist.js";
import Product from "../model/Product.js";

export const creatWishlistCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId
    const { productId } = req.body;



    // Find the wishlist for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    // If no wishlist exists, create a new one
    if (!wishlist) {
        wishlist = new Wishlist({ user: userId, productsId: [productId] });
    } else {
        // Check if the product is already in the wishlist
        if (wishlist.productsId.includes(productId)) {
            return res.status(400).json({ message: 'Product already in wishlist' });
        }

        // Add the product to the wishlist
        wishlist.productsId.push(productId);
    }

    // Save the wishlist
    await wishlist.save();

    // Retrieve the updated wishlist for the user
    wishlist = await Wishlist.findOne({ user: userId }).populate("productsId")

    res.status(201).json({
        success: true,
        message: 'Wishlist created successfully',
        wishlist,
    });

});



// Get All Wishlists


export const getAllWishlistCtrl = asyncHandler(async (req, res) => {
    const wishlists = await Wishlist.find()

    res.json({
        status: "success",
        message: "wishlists fetched successfully",
        wishlists,
    })


})

//get single wishlist

export const getSingleWishlistCtrl = asyncHandler(async (req, res) => { 
    const wishlist = await Wishlist.findById(req.params.id)

    res.json({
        status: "success",
        message: "wishlist fetched  successfully",
        wishlist
    ,
    })


})

//update wishlist

// export const updateWishlistCtrl = asyncHandler(async (req, res) => {
//     const { productId } =
//         req.body;

// const wishlist = await Wishlist.findByIdAndUpdate(req.params.id,{
//     name,

// },{
//     new : true,
// }

// )

//     res.json({
//         status: "success",
//         message: "wishlist updated successfully",
//         wishlist,
//     })
// })


// Delete a wishlist


export const deleteWishlistCtrl = asyncHandler(async (req, res) => {
    await Wishlist.findByIdAndDelete(req.params.id)
  
    res.json({
        status: "success",
        message: "wishlist deleted successfully",
    
    })
})



