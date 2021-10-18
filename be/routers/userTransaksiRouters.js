const express = require("express");
const routers = express.Router();
const {userTransaksiControllers} = require("../controllers")


routers.post("/usertransaksi", userTransaksiControllers.uploadPayment)

module.exports = routers;