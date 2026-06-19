import {
 createSlice,
 createAsyncThunk
}
from "@reduxjs/toolkit";

import {
 addToCart,
 getCart,
 removeFromCart,
 updateQuantity
}
from "../../services/cartService";

export const fetchCart =
createAsyncThunk(

 "cart/fetchCart",

 async (_, thunkAPI)=>{

  try{

   return await getCart();

  }catch(error){

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);



export const removeCartItem =
createAsyncThunk(

 "cart/remove",

 async (
  productId,
  thunkAPI
 ) => {

  try {

   return await
   removeFromCart(
    productId
   );

  } catch(error){

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);

export const updateCartItem =
createAsyncThunk(

 "cart/update",

 async (
  {productId, quantity},
  thunkAPI
 ) => {

  try {

   return await
   updateQuantity(
    productId,
    quantity
   );

  } catch(error){

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);

export const addItemToCart =
createAsyncThunk(

 "cart/add",

 async (
  cartData,
  thunkAPI
 )=>{

  try{

   return await addToCart(
    cartData
   );

  }catch(error){

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);

const initialState = {

 cart:null,

 loading:false,

 error:null
};


const cartSlice =
createSlice({

 name:"cart",

 initialState,

 reducers:{},

 extraReducers:
 (builder)=>{

 builder

 .addCase(
  fetchCart.fulfilled,
  (state,action)=>{

   state.cart =
   action.payload.data;
  }
 )

 .addCase(
  addItemToCart.fulfilled,
  (state,action)=>{

   state.cart =
   action.payload.data;
  }
 )
 
 .addCase(
 updateCartItem.fulfilled,
 (state,action)=>{

  state.cart =
  action.payload.data;
 }
)

.addCase(
 removeCartItem.fulfilled,
 (state,action)=>{

  state.cart =
  action.payload.data;
 }
);
 }
});

export default
cartSlice.reducer;