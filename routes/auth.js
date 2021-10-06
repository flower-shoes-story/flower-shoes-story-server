const express = require("express");
const router = express.Router();

const { login, authorize } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/login", login);
router.get("/check", verifyToken, authorize);

module.exports = router;
