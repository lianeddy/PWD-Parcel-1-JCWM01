const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/getuser", userControllers.getUser);
routers.post("/registeruser", userControllers.registerUser);
routers.patch("/verified", userControllers.verification);
routers.get("/get", userControllers.getAllUsers);
routers.get("/keeplogin", auth, userControllers.keepLogin);
routers.post("/login", userControllers.getData);

module.exports = routers;
