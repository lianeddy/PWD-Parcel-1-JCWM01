const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/getuser", userControllers.getUser);
routers.get("/checkemail", userControllers.checkEmail);
routers.post("/registeruser", userControllers.registerUser);
routers.patch("/verified", auth, userControllers.verification);
routers.get("/get", userControllers.getAllUsers);
routers.get("/keeplogin", auth, userControllers.keepLogin);
routers.post("/login", userControllers.getData);

routers.get("/password", userControllers.getPassword);
routers.patch("/editPassword/:id", userControllers.patchEditPassword);
routers.post("/editPassword", userControllers.postEditPassword);

module.exports = routers;
