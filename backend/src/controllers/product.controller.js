// import Product from "../models/Product.model.js";
// //Product is model 
// export const getProducts = async (
//   req,
//   res
// ) => {
//   try {
//     const products =
//       await Product.find();

//     res.status(200).json({
//       success: true,
//       count: products.length,//no of product found
//       data: products, //product data
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };

// export const createProduct=async(req,res)=>{
//         try {
//             const product = await Product.create(req.body);

//             res.status(201).json({
//                 success : true,
//                 data : product,
//             })
//         } catch (error) {
//             res.status(400).json({
//                 success: false,
//                 message : error.message ,
//             })
//             console.error("something wrong with post",error);
//         }
// }

// export const getProductById =async(req,res)=>{
//     try {
//         const product=await Product.findById( req.params.id );

//         if(!product) res.status(404).json({
//             success :false ,
//             message : "Product not found"
//         })

//         res.status(200).json({
//             success:true,
//             data : product,
//         })

        

//     } catch (error) {
//         req.status(500).json({
//             success :false ,
//             message : error.message
//         })
//     }
// }
//  export const deleteProduct=async(req , res)=>{
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if(!product) res.status(404).json({
//             success:false ,
//             message : "product not found"
//         })

//         res.status(500).json({
//             success : true,
//             message: error.message,
//         })
//     } catch (error) {
        
//     }
//  }

//  export const updateProduct=async(req , res)=>{
//     try {
//         const product =
//       await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//         if(!product) res.status(404).json({
//             success:false ,
//             message : "product not found"
//         })

//         res.status(500).json({
//             success : true,
//             message: error.message,
//         })
//     } catch (error) {
        
//     }
//  }

//upper wala normal jindagi ka funda h mean lamba lamba code

//niche wala h mentos code (product)
 
import Product
from "../models/Product.model.js";

import asyncHandler
from "../utils/asyncHandler.js";

import ApiError
from "../utils/ApiError.js";

import ApiResponse
from "../utils/ApiResponse.js";

export const getProducts =
asyncHandler(async (
  req,
  res
) => {

  const products =
    await Product.find();

  return res.status(200).json(
    new ApiResponse(
      200,
      products,
      "Products fetched"
    )
  );
});

export const createProduct =
asyncHandler(async (req, res) => {

  const product = await Product.create(
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      product,
      "Product created successfully"
    )
  );
});

export const getProductById =
asyncHandler(async (req, res) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product fetched successfully"
    )
  );
});

export const updateProduct =
asyncHandler(async (req, res) => {

  const product =
    await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      product,
      "Product updated successfully"
    )
  );
});

export const deleteProduct =
asyncHandler(async (req, res) => {

  const product =
    await Product.findByIdAndDelete(
      req.params.id
    );

  if (!product) {
    throw new ApiError(
      404,
      "Product not found"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Product deleted successfully"
    )
  );
});