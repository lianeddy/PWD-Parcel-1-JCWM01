const multer = require("multer");
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
    });
  },
};
