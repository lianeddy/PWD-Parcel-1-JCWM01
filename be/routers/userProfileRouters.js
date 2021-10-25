const express = require("express");
const routers = express.Router();
const { userProfileController } = require("../controllers");

routers.post("/store", userProfileController.getPost);
routers.get("/get", userProfileController.getUser);
routers.patch("/edit/:id", userProfileController.getPatch);

module.exports = routers;
