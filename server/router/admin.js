const express = require("express");
const {
  getAdminOrders,
  getAdminUsers,
  getDashboardSummary,
} = require("../controllers/adminController");
const { authMiddleware } = require("../middleware/aurthMiddleware");
const rolecheckmiddleware = require("../middleware/rolecheckmiddleware");

const route = express.Router();
route.use(authMiddleware, rolecheckmiddleware("admin"));
route.get("/summary", getDashboardSummary);
route.get("/orders", getAdminOrders);
route.get("/users", getAdminUsers);

module.exports = route;