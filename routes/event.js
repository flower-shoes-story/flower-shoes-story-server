const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/verifyToken");
const { getEvents } = require("../controllers/event.controller");

router.get("/", verifyToken, getEvents);

module.exports = router;
