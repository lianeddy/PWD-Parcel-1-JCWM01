const express = require("express");
const { uploadControllers } = require("../controllers");
const routers = express.Router();
const multer = require("multer");
const upload = multer();

routers.post("/uploadprofile", uploadControllers.uploadFile);
// routers.patch("/verified", userControllers.verification);
routers.post("/multer", upload.single("file"), uploadControllers.uploadMulter);
routers.patch("/editprofilepicture", uploadControllers.editProfile);
routers.get("/getuserphoto", uploadControllers.getUserPhoto);
routers.get("/getalbum", uploadControllers.getAlbum);

module.exports = routers;
