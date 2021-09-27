const express = require("express");

const router = express.Router();

// MIDDLEWARES
const { authCheck, adminCheck } = require("../middlewares/auth");

// CONTROLLERS
const {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} = require("../controllers/category");

// ROUTES
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

// TO GET SUB-CATEGORIES IN CREATE PRODUCT PAGE
router.get("/category/subs/:_id", getSubs);

module.exports = router;
