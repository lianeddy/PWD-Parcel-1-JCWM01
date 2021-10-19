const express = require("express");
const routers = express.Router();
const {userTransaksiControllers} = require("../controllers")


routers.post("/upload-payment", userTransaksiControllers.uploadPayment)
routers.get("/transaction", userTransaksiControllers.getOrder)
// admin
routers.get("/admin", userTransaksiControllers.getOrder)
routers.patch("/admin-edit", userTransaksiControllers.getOrder)

module.exports = routers;