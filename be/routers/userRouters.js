const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/getuser", userControllers.getUser);
routers.get("/checkemail", userControllers.checkEmail);
routers.post("/registeruser", userControllers.registerUser);
routers.patch("/verified", auth, userControllers.verification);
routers.get("/get", userControllers.getAllUsers);
routers.post("/login", userControllers.getData);

module.exports = routers;
