const express = require("express");
const { adminControllers } = require("../controllers");
const routers = express.Router();

routers.get("/getorderlist", adminControllers.getOrderList);
routers.get("/getyearsales", adminControllers.getYearlySales);

module.exports = routers;
