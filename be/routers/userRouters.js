const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/get", userControllers.getAllUsers);
routers.post("/login", userControllers.getData);

module.exports = routers;
