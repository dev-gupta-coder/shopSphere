// import { Link } from "react-router-dom";

// function ProductCard() {
//   return (
//     <div className="border rounded-lg p-4 shadow">
//         {/* <h1>Productcard</h1> */}
//       <img
//         src="https://picsum.photos/300"
//  // if image not shown then alt text will shown 
//         alt="product"
//         className="w-full h-48 object-cover rounded"
//       />

//       <h2 className="font-semibold text-lg mt-3">
//         Nike Shoes
//       </h2>

//       <p className="text-gray-600">
//         ₹2999
//       </p>

//       <Link
//         to="/products/1"
//         className="bg-black text-white px-4 py-2 mt-3 inline-block rounded"
//       >
//         View Details
//       </Link>
//     </div>
//   );
// }

// export default ProductCard;

import { Link } from "react-router-dom";

function ProductCard({
  _id,
  title,
  price,
  images,
  category,
  rating,
}) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={
  images?.[0] ||
  "https://via.placeholder.com/300"
}
        alt={title}
        className="h-48 w-full object-cover rounded"
      />

      <h2 className="mt-3 font-semibold">
        {title}
      </h2>

      <p>{category}</p>

      <p>⭐ {rating || 0}</p>

      <p className="font-bold">
        ₹{price}
      </p>

      <Link
        to={`/products/${_id}`}
        className="inline-block mt-3 bg-black text-white px-4 py-2 rounded"
      >
        View Details
      </Link>
    </div>
  );
}

export default ProductCard;