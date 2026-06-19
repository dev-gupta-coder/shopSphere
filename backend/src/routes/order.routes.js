import express
from "express";
import  {createRazorpayOrder , verifyPayment} from "../controllers/order.controller.js"
import {
 createOrder,
 getMyOrders,
 getOrderById, 
 getAllOrders,
 updateOrderStatus
}
from
"../controllers/order.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

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
 createOrder
);

router.get(
 "/my-orders",
 verifyJWT,
 getMyOrders
);

router.get(
 "/:id",
 verifyJWT,
 getOrderById
);

//--------------------
router.get(
 "/admin/all",
 verifyJWT,
 authorizeRoles("admin"),
 getAllOrders
);

router.patch(
 "/admin/:id",
 verifyJWT,
 authorizeRoles("admin"),
 updateOrderStatus
);

//-------------------razorpay-order
router.post(
 "/create-razorpay-order",
 verifyJWT,
 createRazorpayOrder
);

router.post(
 "/verify-payment",
 verifyJWT,
 verifyPayment
);

export default router;