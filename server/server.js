const express = require("express");
const cors = require("cors");
const dbconfig = require("./dbconfig");
const route = require("./router");
const cookieParser = require("cookie-parser");
const clodinaryConfig = require("./services/cloudinaryConfig");
const { webhook } = require("./controllers/orderController");
const app = express();
app.use(cookieParser());
require("dotenv").config();
app.post("/webhook", express.raw({ type: "application/json" }), webhook);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
dbconfig();
clodinaryConfig();
app.use(route);
// const dns = require('node:dns/promises');
// dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.listen(8000, () => {
  console.log("server is runing");
});
