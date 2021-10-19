const express = require("express");
const routers = express.Router();
const {userProfileControllers} = require("../controllers")


routers.post("/store", userProfileControllers.getPost)
routers.get("/get", userProfileControllers.getUser)
routers.patch("/edit/:id", userProfileControllers.getPatch)

module.exports = routers;