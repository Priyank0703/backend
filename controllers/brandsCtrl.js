import asyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

export const createBrandCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //brand already exist

    const brandFound = await Brand.findOne({ name });
    if (brandFound) {
        throw new Error("Brand already exists")
    }


    //create 

    const brand = await Brand.create({
        name : name.toLowerCase(),
        user: req.userAuthId
    })

    res.json({
        status: "success",
        message: "Brand created successfully",
        brand,
    })


})

// Get All brands

export const getAllBrandsCtrl = asyncHandler(async (req, res) => {
    const brands = await Brand.find()

    res.json({
        status: "success",
        message: "brands fetched successfully",
        brands,
    })


})


//Get Single brand

export const getSingleBrandCtrl = asyncHandler(async (req, res) => { 
    const brand = await Brand.findById(req.params.id)

    res.json({
        status: "success",
        message: "Brand fetched  successfully",
        brand
    ,
    })


})



//update brand

export const updateBrandCtrl = asyncHandler(async (req, res) => {
    const { name } =
        req.body;

const brand = await Brand.findByIdAndUpdate(req.params.id,{
    name,

},{
    new : true,
}

)

    res.json({
        status: "success",
        message: "brand updated successfully",
        brand,
    })
})



//delete brand

export const deleteBrandCtrl = asyncHandler(async (req, res) => {
    await Brand.findByIdAndDelete(req.params.id)
  
    res.json({
        status: "success",
        message: "Brand deleted successfully",
    
    })
})
