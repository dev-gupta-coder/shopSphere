import Wishlist
from "../models/Wishlist.model.js";

import Product
from "../models/Product.model.js";

import asyncHandler
from "../utils/asyncHandler.js";

import ApiResponse
from "../utils/ApiResponse.js";

import ApiError
from "../utils/ApiError.js";   


//--------------------------------
export const addToWishlist =
asyncHandler(async(
 req,
 res
)=>{

 const { productId } =
 req.body;

 const product =
 await Product.findById(
  productId
 );

 if(!product){
  throw new ApiError(
   404,
   "Product not found"
  );
 }

 let wishlist =
 await Wishlist.findOne({//it searches for req.user._id whose value same as user
  user:req.user._id //user -> db wala user h(saved) //req.user._id -> JWT auth middleware.
 });

 if(!wishlist){

  wishlist =
  await Wishlist.create({
   user:req.user._id,
   products:[]
  });
 }

 const alreadyExists =
 wishlist.products.some(
  id =>
  id.toString()
  === productId
 );

 if(!alreadyExists){

  wishlist.products.push(
   productId
  );
 }

 await wishlist.save();

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   wishlist,
   "Added to wishlist"
  )
 );
});



//-----------------------------------
export const getWishlist =
asyncHandler(async(
 req,
 res
)=>{

 const wishlist =
 await Wishlist.findOne({
  user:req.user._id
 })
 .populate("products"); //ye ref se help se user ke produduct ka pura object nikal deta h

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   wishlist
  )
 );
});



//-----------------------------------

export const removeWishlistItem =
asyncHandler(async(
 req,
 res
)=>{

 const { productId } =
 req.params;

 const wishlist =
 await Wishlist.findOne({
  user:req.user._id
 });

 wishlist.products =
 wishlist.products.filter(
  id =>
  id.toString()
  !== productId
 );

 await wishlist.save();

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   wishlist,
   "Removed"
  )
 );
});