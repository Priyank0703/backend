import express from "express";
import {
    createCouponCtrl,
    getAllCouponsCtrl,
    getCouponCtrl,
    updateCouponCtrl,
    deleteCouponCtrl,
} from "../controllers/couponsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const couponsRouter = express.Router();



couponsRouter.post("/", isLoggedIn,isAdmin, createCouponCtrl)
couponsRouter.get("/", getAllCouponsCtrl)
couponsRouter.put("/update/:id",isLoggedIn, isAdmin,updateCouponCtrl )
couponsRouter.delete("/delete/:id",isLoggedIn,isAdmin, deleteCouponCtrl)

couponsRouter.get("/:id", getCouponCtrl)



export default couponsRouter; 