const express = require("express");
const { productControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", productControllers.getData);
routers.post("/add-product", productControllers.addData);
routers.patch("/edit-product/:id", productControllers.editData);
routers.delete("/delete-product/:id", productControllers.deleteData);

module.exports = routers;
