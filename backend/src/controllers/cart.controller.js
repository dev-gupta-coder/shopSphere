import Cart from"../models/Cart.model.js";
import Product from"../models/Product.model.js";
import asyncHandler from"../utils/asyncHandler.js";
import ApiError from"../utils/ApiError.js";
import ApiResponse from"../utils/ApiResponse.js";

//----------------------------------
export const addToCart =
asyncHandler(async(
 req,
 res
)=>{

 const {
   productId,
   quantity
 } = req.body;

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

 let cart =
 await Cart.findOne({
   user:req.user._id
 });

 if(!cart){
   cart =
   await Cart.create({
     user:req.user._id,
     items:[]
   });
 }

 const existingItem =
 cart.items.find(
 item =>
 item.product.toString()
 === productId
 );

 if(existingItem){

   existingItem.quantity +=
   quantity || 1;
 }
 else{
   cart.items.push({
     product:productId,
     quantity:
       quantity || 1,
   });
 }

 await cart.save();

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   cart,
   "Added to cart"
  )
 );
});



//----------------------------------

export const getCart =
asyncHandler(async(
 req,
 res
)=>{

 const cart =
 await Cart.findOne({
   user:req.user._id
 })
 .populate(      //populate ->Used everywhere. MongoDB automatically fetches:
   "items.product" 
 );

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   cart
  )
 );
});


//----------------------------------

export const updateCartQuantity =
asyncHandler(async (
  req,
  res
) => {

  const { productId } =
    req.params;

  const { quantity } =
    req.body;

  const cart =
    await Cart.findOne({
      user: req.user._id
    });

  if (!cart) {
    throw new ApiError(
      404,
      "Cart not found"
    );
  }

  const item =
    cart.items.find(
      item =>
      item.product.toString()
      === productId
    );

  if (!item) {
    throw new ApiError(
      404,
      "Item not found"
    );
  }

  item.quantity =
    quantity;

  await cart.save();

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      cart,
      "Quantity updated"
    )
  );
});


//------------------------
export const removeFromCart =
asyncHandler(async (
  req,
  res
) => {

  const { productId } =
    req.params;

  const cart =
    await Cart.findOne({
      user: req.user._id
    });

  if (!cart) {
    throw new ApiError(
      404,
      "Cart not found"
    );
  }

  cart.items =
    cart.items.filter(
      item =>
        item.product.toString()
        !== productId
    );

  await cart.save();

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      cart,
      "Item removed from cart"
    )
  );
});