import asyncHandler from "express-async-handler";
import color from "../model/Brand.js";
import Color from "../model/color.js";


export const createColorCtrl = asyncHandler(async (req, res) => {
    const { name } = req.body;

    //color already exist

    const colorFound = await Color.findOne({ name });
    if (colorFound) {
        throw new Error("Color already exists")
    }


    //create 

    const color = await Color.create({
        name : name.toLowerCase(),
        user: req.userAuthId
    })

    res.json({
        status: "success",
        message: "Color created successfully",
        color,
    })


})

// Get All color

export const getAllColorsCtrl = asyncHandler(async (req, res) => {
    const colors = await Color.find()

    res.json({
        status: "success",
        message: "colors fetched successfully",
        colors,
    })


})


//Get Single color

export const getSinglecolorCtrl = asyncHandler(async (req, res) => { 
    const color = await Color.findById(req.params.id)

    res.json({
        status: "success",
        message: "color fetched  successfully",
        color
    ,
    })


})



//update color

export const updateColorCtrl = asyncHandler(async (req, res) => {
    const { name } =
        req.body;

const color = await Color.findByIdAndUpdate(req.params.id,{
    name,

},{
    new : true,
}

)

    res.json({
        status: "success",
        message: "color updated successfully",
        color,
    })
})



//delete brand

export const deleteColorCtrl = asyncHandler(async (req, res) => {
    await Color.findByIdAndDelete(req.params.id)
  
    res.json({
        status: "success",
        message: "Color deleted successfully",
    
    })
})
