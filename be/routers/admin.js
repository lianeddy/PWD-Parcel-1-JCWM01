const express = require("express");
const { adminControllers } = require("../controllers");
const routers = express.Router();

routers.get("/getorderlist", adminControllers.getOrderList);

module.exports = routers;
