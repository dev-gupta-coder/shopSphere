import {
 createSlice,
 createAsyncThunk
}
from "@reduxjs/toolkit";

import {
 getAllProducts ,getProductById
}
from "../../services/productService";

export const fetchProducts =
createAsyncThunk(
 "products/fetchProducts",

 async (_, thunkAPI) => {

  try {

   return await getAllProducts();

  } catch (error) {

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message ||
    "Failed to fetch products"
   );
  }
 }
);

const initialState = {

 products: [],

 product: null,

 loading:false,

 error:null
}

const productSlice =
createSlice({

 name: "products",

 initialState,

 reducers: {},

 extraReducers:
 (builder) => {

 builder

 .addCase(
  fetchProducts.pending,
  (state) => {

   state.loading = true;

   state.error = null;
  }
 )

 .addCase(
  fetchProducts.fulfilled,
  (state, action) => {

   state.loading = false;

   state.products =
   action.payload.data;
  }
 )

 .addCase(
  fetchProducts.rejected,
  (state, action) => {

   state.loading = false;

   state.error =
   action.payload;
  }
 )

 .addCase(
 fetchProductDetails.pending,
 (state)=>{

  state.loading =
  true;
 }
)

.addCase(
 fetchProductDetails.fulfilled,
 (state,action)=>{

  state.loading =
  false;

  state.product =
  action.payload.data;
 }
)

.addCase(
 fetchProductDetails.rejected,
 (state,action)=>{

  state.loading =
  false;

  state.error =
  action.payload;
 });
 }
});



export const fetchProductDetails =
createAsyncThunk(
 "products/fetchDetails",

 async (id, thunkAPI) => {

  try {

   return await
   getProductById(id);

  } catch (error) {

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);



export default
productSlice.reducer;



