const express = require("express");
const { uploadController } = require("../controllers");
const routers = express.Router();
const multer = require("multer");
const upload = multer();

routers.post("/uploadprofile", uploadController.uploadFile);
// routers.patch("/verified", userControllers.verification);
routers.post("/multer", upload.single("file"), uploadController.uploadMulter);

module.exports = routers;
