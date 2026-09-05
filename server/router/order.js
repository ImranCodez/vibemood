const express = require("express");
const { CheckOut, webhook } = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/aurthMiddleware");

const route = express.Router();

route.post("/checkout", authMiddleware, CheckOut);
route.post("/webhook  ", authMiddleware, webhook);
module.exports = route;
