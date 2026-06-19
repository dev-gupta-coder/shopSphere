import express from "express";

import {addToCart,getCart,  updateCartQuantity, removeFromCart} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router =
express.Router();

router.post(
 "/",
 verifyJWT,
 addToCart
);

router.get(
 "/",
 verifyJWT,
 getCart
);

router.patch(
  "/:productId",
  verifyJWT,
  updateCartQuantity
);


router.delete(
  "/:productId",
  verifyJWT,
  removeFromCart
);


export default router;