const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const User = require("../models/userthSchema");
const sendResponse = require("../services/responsiveHandler");

const getDashboardSummary = async (req, res) => {
  try {
    const [orders, users, products, revenue] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments(),
      Product.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
    ]);

    return sendResponse(res, 200, "", true, {
      orders,
      users,
      products,
      revenue: revenue[0]?.total || 0,
    });
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Could not load dashboard summary");
  }
};

const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullname email")
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return sendResponse(res, 200, "", true, orders);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Could not load orders");
  }
};

const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("fullname email role isVerified createdAt")
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return sendResponse(res, 200, "", true, users);
  } catch (error) {
    console.error(error);
    return sendResponse(res, 500, "Could not load users");
  }
};

module.exports = { getDashboardSummary, getAdminOrders, getAdminUsers };