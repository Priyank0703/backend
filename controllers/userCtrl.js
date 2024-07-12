import User from "../model/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";


//register user
export const registerUserCtrl = asyncHandler(
  async (req, res) => {
    const { fullname, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");

    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });

  }
)

//login user
export const loginUserCtrl = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({
      email,
    });

    if (userFound && (await bcrypt.compare(password, userFound?.password)))
      res.json({
        status: "success",
        message: "User logged in successfully",
        userFound,
        token: generateToken(userFound?._id),
      })

    else {
      throw new Error('Invalid Login Credentials')
    }
  }

)

//profile page
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  //verify token
  const verified = verifyToken(token);
  console.log(req);

  res.json({
    msg: "welcome to  profile page"
  })
})

//Update user shipping address

export const updateShippingAddressCtrl = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    province,
    phone,
  } = req.body;

  const user = await User.findByIdAndUpdate(req.userAuthId , {

shippingAddress : {
  firstName,
    lastName,
    address,
    city,
    postalCode,
    province,
    phone,
},
hasShippingAddress : true,

  },{
    new : true,
  })
  //send response
  res.json({
    status : "success",
    message : "Shipping address updated",
    user,
  })
})

