const express = require("express");
const { adminController } = require("../controllers");
adminController;
const routers = express.Router();

routers.get("/getorderlist", adminController.getOrderList);

module.exports = routers;
