import Order from
"../models/Order.model.js";

import Cart from
"../models/Cart.model.js";

import asyncHandler from
"../utils/asyncHandler.js";

import ApiResponse from
"../utils/ApiResponse.js";

import ApiError from
"../utils/ApiError.js";

import razorpay
from "../config/razorpay.js";

import crypto
from "crypto";

//------------------------------------create order
export const createOrder =
asyncHandler(async(
 req,
 res
)=>{

 const {
  shippingAddress
 } = req.body;

 //----shipping address included by helping gpt
 if (!shippingAddress) {
  throw new ApiError(
    400,
    "Shipping address is required"
  );
}


 const cart =
 await Cart.findOne({
  user:req.user._id
 })
 .populate(
  "items.product"
 );

 if(
  !cart ||
  cart.items.length===0
 ){
  throw new ApiError(
   400,
   "Cart is empty"
  ); 
 }

 const orderItems =
 cart.items.map(
 item => ({
  product:
   item.product._id,

  title:
   item.product.title,

  price:
   item.product.price,

  quantity:
   item.quantity,

  image:
   item.product.images?.[0]
 })
 );

 const totalAmount =
 cart.items.reduce(
 (acc,item)=>
 acc +
 item.product.price *
 item.quantity,
 0
 );

 const order =
 await Order.create({

  user:req.user._id,

  orderItems,

  shippingAddress,

  totalAmount

 });

 cart.items=[];

 await cart.save();

 return res.status(201)
 .json(
  new ApiResponse(
   201,
   order,
   "Order Created"
  )
 );
});


//---------------------------------get single order
export const getOrderById =
asyncHandler(async(
 req,
 res
)=>{

 const order =
 await Order.findById(
  req.params.id
 );

 if(!order){
  throw new ApiError(
   404,
   "Order not found"
  );
 }

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   order
  )
 );
}); 

//---------------------------get my order
export const getMyOrders =
asyncHandler(async(
 req,
 res
)=>{

 const orders =
 await Order.find({
  user:req.user._id
 });

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   orders
  )
 );
});


//--------------------get all orders
export const getAllOrders =
asyncHandler(async(
 req,
 res
)=>{

 const orders =
 await Order.find()
 .populate(
  "user",
  "name email"
 );

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   orders
  )
 );
});

//=-----------update order status
export const updateOrderStatus =
asyncHandler(async(
 req,
 res
)=>{

 const {
  orderStatus
 } = req.body;

 const order =
 await Order.findById(
  req.params.id
 );

 if(!order){
  throw new ApiError(
   404,
   "Order not found"
  );
 }

 order.orderStatus =
 orderStatus;

 await order.save();

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   order,
   "Status Updated"
  )
 );
});


//=--------------------- createRazorpayOrder
export const createRazorpayOrder =
asyncHandler(async(
 req,
 res
)=>{

 const {
  amount
 } = req.body;

 const options = {

  amount:
   amount * 100,

  currency:"INR",

  receipt:
   `receipt_${Date.now()}`
 };

 const razorpayOrder =
 await razorpay.orders.create(
  options
 );

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   razorpayOrder
  )
 );
});





//---------------------verifyPayment
export const verifyPayment =
asyncHandler(async(
 req,
 res
)=>{

 const {
  razorpay_order_id,

  razorpay_payment_id,

  razorpay_signature,

  orderId
 } = req.body;

 const body =

 razorpay_order_id
 + "|"
 + razorpay_payment_id;

 const expectedSignature =

 crypto
 .createHmac(
  "sha256",
  process.env
  .RAZORPAY_KEY_SECRET
 )
 .update(body)
 .digest("hex");

 const isAuthentic =

 expectedSignature
 === razorpay_signature;

 if(!isAuthentic){

  throw new ApiError(
   400,
   "Payment Failed"
  );
 }

 await Order.findByIdAndUpdate(
  orderId,
  {
   paymentStatus:
   "paid",

   paymentId:
   razorpay_payment_id,

   razorpayOrderId:
   razorpay_order_id
  }
 );

 return res.status(200)
 .json(
  new ApiResponse(
   200,
   {},
   "Payment Verified"
  )
 );
});