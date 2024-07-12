import asyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/Product.js";

//Creat new review

export const createReviewCtrl = asyncHandler(async(req,res)=>{
    const {product,message,rating} = req.body;
 //1.find the product
 const {productID} = req.params;
const productFound = await Product.findById(productID).populate("reviews");
if(!productFound){
    throw new Error("Product not found")
}
//check if user already reviwed
const hasReviewed = productFound?.reviews?.find((review)=>{
    return review?.user?.toString() === req.userAuthId?.toString()
});
if(hasReviewed){
    throw new Error("You already reviewed this product")
}


const review = await Review.create({
    message,
    rating,
    product:productFound?._id, 
    user:req.userAuthId
})
//push review
productFound.reviews.push(review?._id);
//resave
await productFound.save();    
res.status(201).json({
    success : true,
    message : "Review created successfully",
})

})
