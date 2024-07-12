import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";

export const createProductCtrl = asyncHandler(async (req, res) => {
    console.log(req.files); 
    const { name, description, category, sizes, colors, price, totalQty, brand } =
        req.body;


    const productExists = await Product.findOne({ name });
    if (productExists) {
        throw new Error("Product already exists")
    }
//find the category

const categoryFound = await Category.findOne({ name: category});

if(!categoryFound){
    throw new Error ("Category not found , please create a category first or check category name..")
}


//find the brand

const brandFound = await Brand?.findOne({ name: brand.toLowerCase() });

if(!brandFound){
throw new Error ("brand not found , please create a brand first or check brand name..")
}


    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand,
    });

    //push the product into category 
categoryFound.products.push(product._id);
//resave
await categoryFound.save();



    //push the product into brand 
    brandFound.products.push(product._id);
    //resave
    await brandFound.save();


    //send response

    res.json(
        {
            status: "success",
            message: "Product created successfully",
            product,
        }
    )


})

//filter product

export const getProductsCtrl = asyncHandler(async (req, res) => {
    console.log(req.query)
    //query
    let productQuery = Product.find();

    //search by name

    if (req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i" }
        })
    }

    //search by brand

    if (req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i" }
        })
    }


    //search by category

    if (req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i" }
        })
    }

    //search by color

    if (req.query.color) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.color, $options: "i" }
        })
    }

    //search by size

    if (req.query.size) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.size, $options: "i" }
        })
    }

    //filter by price range
    if (req.query.price) {
        const priceRange = req.query.price.split("-");


        //gte = greater than or equal to
        //lte = less than or equal to
        productQuery = productQuery.find({
            price: { $gte: priceRange[0], $lte: priceRange[1] }
        })

    }
    //pagination
    //page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    //limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //startIdx
    const startIndex = (page - 1) * limit;
    //endIdx
    const endIndex = page * limit;
    //total
    const total = await Product.countDocuments();

    productQuery = productQuery.skip(startIndex).limit(limit);

    //pagination results 
    const pagination = {}
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        }
    }
    //await query
    const products = await productQuery.populate("reviews");
    res.json({
        status: "success",
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products,
    })
})


//get product by the id

export const getProductCtrl = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate("reviews")
    if (!product) {
        throw new Error("Product not found")
    }
    res.json({
        status: "success",
        message: "Product fetched successfully",
        product,
    })
})


//update

export const updateProductCtrl = asyncHandler(async (req, res) => {
    const { name,
        description,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
        brand } =
        req.body;

const product = await Product.findByIdAndUpdate(req.params.id,{
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand 
},{
    new : true,
}

)

    res.json({
        status: "success",
        message: "Product updated successfully",
        product,
    })
})


//delete product

export const deleteProductCtrl = asyncHandler(async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
  
    res.json({
        status: "success",
        message: "Product deleted successfully",
    
    })
})
