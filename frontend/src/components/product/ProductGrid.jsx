// import ProductCard from "./ProductCard";

// function ProductGrid() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* <h1>ProductGrid</h1> */}
//       <ProductCard />
//       <ProductCard />
//       <ProductCard />
//       <ProductCard />
//     </div>
//   );
// }

// export default ProductGrid;

import ProductCard from "./ProductCard";

function ProductGrid({ products }) {

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-6
      "
    >
      {products?.map((product) => (

        <ProductCard
          key={product._id}
          {...product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;