// create new Coupon
import asyncHandler from "express-async-handler";
import Coupon from "../model/Coupon.js";


export const createCouponCtrl = asyncHandler(async (req, res) => {
    const { code,
        startDate,
        endDate,
        discount,
    } = req.body

    //check if admin
    //check if coupon already exists
    const couponsExists = await Coupon.findOne({ code })
    if (couponsExists) {
        throw new Error("Coupon already exists")
    }
    //check if discount is not a number
    if (isNaN(discount)) {
        throw new Error("discount value must be a number")
    }



    //create coupon

    const newCoupon = await Coupon.create({
        code: code?.toUpperCase(),
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    })


    res.status(201).json({
        status: "success",
        message: "Coupon Created Successfully.",
        newCoupon,
    })


})

//get all coupons

export const getAllCouponsCtrl = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find();
    res.status(201).json({
        status: "success",
        message: "All Coupons",
        coupons,
    })
})




///get single coupon

export const getCouponCtrl = asyncHandler(async(req,res)=>{
    const coupon = await Coupon.findById(req.params.id);
    res.json({
        status : "success",
        message : "Coupon Found",
        coupon
    })
})
 
//update coupon

export const updateCouponCtrl = asyncHandler(async(req,res)=>{
    const {code , startDate, endDate, discount} = req.body;
 const coupon = await Coupon.findByIdAndUpdate(req.params.id, {code : code?.toUpperCase, startDate, endDate, discount},
    {
        new : true,
    }

);
res.json({
    status : "success",
    message : "Coupon Updated Successfully",
coupon,})
})


//delete coupon

export const deleteCouponCtrl = asyncHandler(async(req,res)=>{
    const coupon = await Coupon.findByIdAndDelete(
      req.params.id
   
   );
   res.json({
       status : "success",
       message : "Coupon deleted Successfully",
   coupon,})
})