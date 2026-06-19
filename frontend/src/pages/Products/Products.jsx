import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductGrid from "../../components/product/ProductGrid";
import Loader from "../../components/ui/Loader";

import {
  fetchProducts,
} from "../../features/products/productSlice";

function Products() {

  const dispatch =
    useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector(
    (state) =>
      state.products
  );

  useEffect(() => {

    dispatch(
      fetchProducts()
    );

  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">

      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Products
      </h1>

      <ProductGrid
        products={products}
      />

    </div>
  );
}

export default Products;