const express = require("express");
const { uploadController } = require("../controllers");
const routers = express.Router();
const multer = require("multer");
const upload = multer();

routers.post("/uploadprofile", uploadController.uploadFile);
// routers.patch("/verified", userControllers.verification);
routers.post("/multer", upload.single("file"), uploadController.uploadMulter);
routers.patch("/editprofilepicture", uploadController.editProfile);
routers.get("/getuserphoto", uploadController.getUserPhoto);
routers.get("/getalbum", uploadController.getAlbum);

module.exports = routers;
