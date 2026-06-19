import mongoose from "mongoose";

const cartSchema =
new mongoose.Schema(
{
  user:{
    type:
      mongoose.Schema.Types.ObjectId,

    ref:"User", ////means Connect this field to User collection.

    required:true,
  },

  items:[
    {
      product:{
        type:
          mongoose.Schema.Types.ObjectId,

        ref:"Product", //means Connect this field to Product collection.

        required:true,
      },

      quantity:{
        type:Number,
        default:1,
        min:1,
      }
    }
  ]
},
{
 timestamps:true
});

const Cart =
mongoose.model(
 "Cart",
 cartSchema
);

export default Cart;