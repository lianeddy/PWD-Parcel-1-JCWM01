const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();

routers.get("/getuser", userControllers.getUser);
routers.post("/registeruser", userControllers.registerUser);
routers.patch("/verified", userControllers.verification);

module.exports = routers;
