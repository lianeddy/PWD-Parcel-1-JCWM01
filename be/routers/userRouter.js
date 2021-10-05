const express = require("express");
const { userControllers } = require("../controllers");
const routers = express.Router();

routers.get("/getuser", userControllers.getUser);
routers.post("/registeruser", userControllers.registerUser);

module.exports = routers;
