import mongoose from "mongoose";

const orderSchema =
new mongoose.Schema(
{
 user:{
  type:
   mongoose.Schema.Types.ObjectId,

  ref:"User",

  required:true
 },

 orderItems:[
  {
   product:{
    type:
     mongoose.Schema.Types.ObjectId,

    ref:"Product"
   },

   title:String,

   price:Number,

   quantity:Number,

   image:String
  }
 ],

 shippingAddress:{
  address:String,
  city:String,
  state:String,
  pincode:String,
  country:String
 },

 totalAmount:{
  type:Number,
  required:true
 },

 paymentStatus:{
  type:String,

  enum:[
   "pending",
   "paid",
   "failed"
  ],

  default:"pending"
 },

 orderStatus:{
  type:String,

  enum:[
   "processing",
   "shipped",
   "delivered",
   "cancelled"
  ],

  default:"processing"
 },
razorpayOrderId:{
 type:String
},
 
paymentId:{
 type:String
},

},
{
 timestamps:true
},

);


const Order =
mongoose.model(
 "Order",
 orderSchema
);

export default Order;