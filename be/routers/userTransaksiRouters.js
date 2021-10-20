const express = require("express");
const routers = express.Router();
const {userTransaksiControllers} = require("../controllers")


routers.post("/upload-payment", userTransaksiControllers.uploadPayment)
routers.get("/transaction", userTransaksiControllers.getOrder)
// admin
routers.get("/admin", userTransaksiControllers.getAdmin)
routers.patch("/admin-edit", userTransaksiControllers.getAdminEdit)
routers.post("/confirm", userTransaksiControllers.confirm)
routers.post("/reject", userTransaksiControllers.rejected)

module.exports = routers;