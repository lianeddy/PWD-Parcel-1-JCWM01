const multer = require('multer');

module.exports = {
    uploadImg : (req,res) => {

        const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });
  
 return multer({storage: storage}).single('myFile');
        
    }
}

