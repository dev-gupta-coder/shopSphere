import { useEffect } from "react";
import {
 useDispatch,
 useSelector
}
from "react-redux";

import {
 useParams
}
from "react-router-dom";

import Loader
from "../../components/ui/Loader";

import {
 fetchProductDetails
}
from "../../features/products/productSlice";

import {
  addItemToCart
}
from "../../features/cart/cartSlice";


function ProductDetails() {

 const { id } =
 useParams();

 const dispatch =
 useDispatch();

 const {
  product,
  loading,
  error
 } = useSelector(
  state =>
  state.products
 );


    const handleAddToCart =
async () => {

  const result =
  await dispatch(

    addItemToCart({

            productId:
            product._id,

            quantity: 1
            })

        );

        console.log(
            "Cart Result",
            result
        );
        };


 useEffect(()=>{

  dispatch(
   fetchProductDetails(
    id
   )
  );

 },[
  dispatch,
  id
 ]);

 if(loading){
  return <Loader />;
 }

 if(error){
  return (
   <div>
    {error}
   </div>
  );
 }

 if(!product){
  return null;
 }

 return (
  <div
   className="
   max-w-6xl
   mx-auto
   p-8"
  >

   <div
    className="
    grid
    md:grid-cols-2
    gap-8"
   >

    <img
     src={
      product.images?.[0]
     }
     alt={
      product.title
     }
     className="
     rounded-lg"
    />

    <div>

     <h1
      className="
      text-3xl
      font-bold"
     >
      {product.title}
     </h1>

     <p
      className="
      text-2xl
      mt-4"
     >
      ₹{product.price}
     </p>

     <p
      className="
      mt-4
      text-gray-600"
     >
      {
       product.description
      }
     </p>

     <button
        onClick={
        handleAddToCart
        }
        className="
        bg-black
        text-white
        px-6
        py-3
        rounded
        mt-6"
        >
        Add To Cart
    </button>

    </div>

   </div>

  </div>
 );
}

export default ProductDetails;