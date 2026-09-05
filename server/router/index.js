const express = require("express");
const route = express.Router();
const authRouter = require("./auth");
const productRouter = require("./product");
const orderRoute=require("./order")
const { authMiddleware } = require("../middleware/aurthMiddleware");
route.use("/auth", authRouter);
route.use("/category",require("./category"))   
route.use("/product", productRouter);
route.use("/order", authMiddleware, orderRoute);
route.use("/cart",authMiddleware,require("./cart") );

module.exports = route;
