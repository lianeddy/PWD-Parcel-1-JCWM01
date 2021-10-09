const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/getuser", userControllers.getUser);
routers.post("/registeruser", userControllers.registerUser);
// routers.patch("/verified", userControllers.verification);
routers.patch("/verified", auth, userControllers.verification);

module.exports = routers;
