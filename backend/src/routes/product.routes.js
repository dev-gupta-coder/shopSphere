import express from "express";

import {
  getProducts, createProduct , getProductById , deleteProduct , updateProduct
} from "../controllers/product.controller.js";

import { verifyJWT }
from "../middleware/auth.middleware.js";

import { authorizeRoles }
from "../middleware/role.middleware.js";

const router = express.Router();

// router.get(
//   "/",
//   getProducts
// );

// router.post("/",createProduct );

//or simply 
router.route("/")
  .get(getProducts)
  .post(
    verifyJWT,
    authorizeRoles("admin"),
    createProduct
  );

router.route("/:id")
  .get(getProductById)
  .put(
    verifyJWT,
    authorizeRoles("admin"),
    updateProduct
  )
  .delete(
    verifyJWT,
    authorizeRoles("admin"),
    deleteProduct
  );

export default router;