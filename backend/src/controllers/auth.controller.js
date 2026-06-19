import User from "../models/User.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
 
export const registerUser = 
asyncHandler(async (
  req,
  res
) => {

  const {name,email,password, } = req.body;

  const existingUser =
    await User.findOne({
      email,
    });

  if (existingUser) {
    throw new ApiError(
      400,
      "User already exists"
    );
  }

  const user =
    await User.create({
      name,
      email,
      password,
    });

  return res.status(201).json(
    new ApiResponse(
      201,
      user,
      "User registered"
    )
  );
});


export const loginUser =
asyncHandler(async ( req,res) => {
  const { email, password} = req.body;
  const user =
    await User.findOne({
      email
    });
// const user =
// await User.findOne({
//  email
// })
// .select("-password");



  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  const isPasswordCorrect =
    await user.comparePassword(
      password
    );

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid Credentials"
    );
  }

  const token =
    user.generateAccessToken();

  const options = {
    httpOnly: true,//JavaScript cannot read this cookie
    secure: false,//Cookie can be sent on HTTP
  };

    const safeUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    };

    return res
    .status(200)
    .cookie(
    "accessToken",
    token,
    options
    )
    .json(
    new ApiResponse(
        200,
        {
        user: safeUser,
        token,
        },
        "Login Successful"
    )
    );
});



export const logoutUser =
asyncHandler(async (
  req,
  res
) => {

  return res
    .status(200)
    .clearCookie(
      "accessToken"
    )
    .json(
      new ApiResponse(
        200,
        {},
        "Logged Out"
      )
    );
});


export const getCurrentUser =
asyncHandler(async (
  req,
  res
) => {

  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current User"
    )
  );
});