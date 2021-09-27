const express = require("express");

const router = express.Router();

// MIDDLEWARES
const { authCheck, adminCheck } = require("../middlewares/auth");

// CONTROLLERS
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

// POST
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

// * validate admin
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
