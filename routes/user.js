const express = require("express");

const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
  createCashOrder,
} = require("../controllers/user");

// * CART
router.post("/user/cart", authCheck, userCart); // save cart
router.get("/user/cart", authCheck, getUserCart); // get cart
router.delete("/user/cart", authCheck, emptyCart); // empty cart
router.post("/user/address", authCheck, saveAddress); // save address

// * COUPON
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

// * USER ORDERS
router.post("/user/order", authCheck, createOrder); // + Stripe
router.post("/user/cash-order", authCheck, createCashOrder); // + COD
router.get("/user/orders", authCheck, orders);

// * WISHLIST
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

// * GET
router.get("/user", (req, res) => {
  res.json({
    data: "Successful -- API Trigerred 🎯🎯🎯🎯 !!",
  });
});

module.exports = router;
