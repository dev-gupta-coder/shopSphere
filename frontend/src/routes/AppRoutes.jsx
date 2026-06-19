import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from
"../pages/Cart/Cart";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/products" element={<Products />} />

      <Route
            path="/cart"
            element={<Cart />}
            />

      <Route path="/products/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default AppRoutes;