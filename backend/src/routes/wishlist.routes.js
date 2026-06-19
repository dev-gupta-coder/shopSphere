import express
from "express";

import {
 addToWishlist,
 getWishlist,
 removeWishlistItem
}
from
"../controllers/wishlist.controller.js";

import {
 verifyJWT
}
from
"../middleware/auth.middleware.js";

const router =
express.Router();

router.post(
 "/",
 verifyJWT,
 addToWishlist
);

router.get(
 "/",
 verifyJWT,
 getWishlist
);

router.delete(
 "/:productId",
 verifyJWT,
 removeWishlistItem
);

export default router;