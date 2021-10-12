const express = require("express");
const { uploadController } = require("../controllers");
const routers = express.Router();

routers.post("/uploadprofile", uploadController.uploadFile);
// routers.patch("/verified", userControllers.verification);

module.exports = routers;
