const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { updateUserInfo } = require("../controllers/user.controller");

router.put("/update", verifyToken, updateUserInfo);

module.exports = router;
