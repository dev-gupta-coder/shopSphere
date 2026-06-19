import express
from "express";

import {
 getAllUsers,
 deleteUser
}
from
"../controllers/user.controller.js";

import {
 verifyJWT
}
from
"../middleware/auth.middleware.js";

import {
 authorizeRoles
}
from
"../middleware/role.middleware.js";

const router =
express.Router();

router.get(
 "/",
 verifyJWT,
 authorizeRoles(
  "admin"
 ),
 getAllUsers
);

router.delete(
 "/:id",
 verifyJWT,
 authorizeRoles(
  "admin"
 ),
 deleteUser
);



export default router;