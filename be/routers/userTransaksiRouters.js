const express = require("express");
const routers = express.Router();
const {userTransaksiControllers} = require("../controllers")


routers.post("/upload-payment", userTransaksiControllers.uploadPayment)
routers.get("/transaction", userTransaksiControllers.getOrder)

module.exports = routers;