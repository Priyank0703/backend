//Wishlist schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WishlistSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productsId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",

            },
        ],
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;