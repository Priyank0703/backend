import multer from "multer";
import cloudinaryPackage from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();


const cloudinary = cloudinaryPackage.v2;

//configure cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});


//creat storage engine for multer

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png", "jpeg"],
    params: {
        folder: "productimage"
    }
})


//init multer with storage Engine

const categoryFileUpload = multer({
    storage,
})


export default categoryFileUpload;