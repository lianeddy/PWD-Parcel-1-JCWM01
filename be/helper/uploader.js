const multer = require("multer");
// fs untuk mengecek file / directory
const fs = require("fs");

module.exports = {
  uploader: (directory, fileNamePrefix) => {
    // Lokasi penyimpanan file
    let defaultDirectory = "./public";

    // diskStorage : untuk menyimpan file dari frontend FE ke dalam directory backend BE
    const storage = multer.diskStorage({
      destination: (req, res, cb) => {
        const pathDirectory = defaultDirectory + directory;

        if (fs.existsSync(pathDirectory)) {
          console.log(
            "Directory ada, fungsi bawah ini ngecek ada ato tidaknya directory"
          );
          cb(null, pathDirectory);
        } else {
          fs.mkdir(pathDirectory, { recursive: true }, (err) =>
            cb(err, pathDirectory)
          );
        }
      },
      filename: (req, file, cb) => {
        let ext = file.originalname.split(".");
        let filename = fileNamePrefix + Date.now() + "." + ext[ext.length - 1];
        cb(null, filename);
      },
    });
    const fileFilter = (req, file, cb) => {
      const ext = /\.(jpg|jpeg|png|gif|txt|JPG|JPEG)/;
      if (!file.originalname.match(ext)) {
        return cb(new Error("Your file type are denied"), false);
      }
      cb(null, true);
    };
    return multer({
      storage,
      fileFilter,
    });
  },
};
