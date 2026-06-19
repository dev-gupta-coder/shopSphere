import {
 createSlice,
 createAsyncThunk
}
from "@reduxjs/toolkit";

import {
 loginUser,
 getCurrentUser,
 logoutUser
}
from "../../services/authService";



export const login =
createAsyncThunk(

 "auth/login",

 async (
  userData,
  thunkAPI
 ) => {

  try {

   return await loginUser(
    userData
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



export const fetchCurrentUser =
createAsyncThunk(

 "auth/me",

 async (
  _,
  thunkAPI
 ) => {

  try {

   return await getCurrentUser();

  } catch(error){

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);




const initialState = {

 user:null,

 loading:false,

 error:null,

 isAuthenticated:false
};




export const logout =
createAsyncThunk(

 "auth/logout",

 async (_, thunkAPI)=>{

  try {

   return await
   logoutUser();

  } catch(error){

   return thunkAPI
   .rejectWithValue(
    error.response?.data
    ?.message
   );
  }
 }
);




const authSlice =
createSlice({

 name:"auth",

 initialState,

 reducers:{},

 extraReducers:
 (builder)=>{

 builder

 .addCase(
  login.pending,
  (state)=>{

   state.loading =
   true;

   state.error =
   null;
  }
 )

 .addCase(
  login.fulfilled,
  (state,action)=>{

   state.loading =
   false;

   state.user =
   action.payload.data.user;

   state.isAuthenticated =
   true;
  }
 )

 .addCase(
  login.rejected,
  (state,action)=>{

   state.loading =
   false;

   state.error =
   action.payload;
  }
 )
 
 .addCase(
 fetchCurrentUser.fulfilled,
 (state, action) => {

  state.user =
  action.payload.data;

  state.isAuthenticated =
  true;
 }
)

.addCase(
 fetchCurrentUser.rejected,
 (state) => {

  state.user = null;
  state.isAuthenticated = false;
 })

.addCase(
 logout.fulfilled,
 (state)=>{

  state.user = null;

  state.isAuthenticated =
  false;
 });
 }
});

export default
authSlice.reducer;