import User
from "../models/User.model.js";

import asyncHandler
from "../utils/asyncHandler.js";

import ApiResponse
from "../utils/ApiResponse.js";

export const getAllUsers =
asyncHandler(async(
 req,
 res
)=>{

 const users =
 await User.find()
 .select("-password"); //mean give object of user but excluded password

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   users
  )
 );
});

//--------------delete 
export const deleteUser =
asyncHandler(async(
 req,
 res
)=>{

 const user =
 await User.findByIdAndDelete(
  req.params.id
 );

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   user,
   "User Deleted"
  )
 );
});

//