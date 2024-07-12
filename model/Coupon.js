//coupon model
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//coupon is expired
CouponSchema.virtual("isExpired").get(function () {
  return this.endDate < Date.now();
})

CouponSchema.virtual("daysLeft").get(function () {
  const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) + "  " + 'days left';
  return daysLeft;
})
//validation
CouponSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    return next(new Error("End date must be greater than start date"))

  } next();
})

CouponSchema.pre("validate", function (next) {
  if (this.startDate < Date.now()) {
    return next(new Error("start date must be greater than today."))

  } next();
})

CouponSchema.pre("validate", function (next) {
  if (this.endDate < Date.now()) {
    return next(new Error("end date must be greater than today."))

  } next();
})

CouponSchema.pre("validate", function (next) {
  if (this.discount < 0 || this.discount > 100) {
    return next(new Error("Discount must be between 0 and 100"))
  }
  next();

})


const Coupon = mongoose.model("Coupon", CouponSchema);

export default Coupon;




