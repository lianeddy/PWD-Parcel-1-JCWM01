const express = require("express");
const routers = express.Router();
const {cartControllers} = require("../controllers")


routers.post("/carts", cartControllers.cartPost)
routers.patch("/carts:id", cartControllers.cartPatch)
routers.delete("/carts:id", cartControllers.cartDelete)


module.exports = routers;