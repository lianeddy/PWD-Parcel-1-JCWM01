const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  uploadFile: (req, res) => {
    // console.log("ini req", req.files);
    // console.log("masuk uloadfile");
    try {
      let path = "/images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);
      console.log("masuk uloadfile2");

      upload(req, res, (err) => {
        if (err) {
          // console.log(err);
          res.status(500).send(err);
        }

        // console.log(req);
        console.log("req, file", req.files.file);

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;

        console.log("req, file2", req.files.file);

        // let data = JSON.parse(req.body.data);
        // data.image = filepath;

        let sqlInsert = `INSERT into user values (null,null,null,null,null,null,null,null,null,null,${db.escape(
          filepath
        )},null,null,null)`;
        db.query(sqlInsert, (err, result) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filepath);
            res.status(500).send(err);
          }

          res.status(200).send({ message: "Upload file success" });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
    // let scriptQuery = "Select * from user;";
    // if (req.query.id) {
    //   scriptQuery = `Select * from user where id=${db.escape(req.query.id)}`;
    // }
    // db.query(scriptQuery, (err, results) => {
    //   if (err) res.status(500).send(err);
    //   res.status(200).send(results);
    // });
  },
  uploadMulter: (req, res) => {
    console.log("hey masuk multer nih");
    console.log(req.body);
    console.log(req.file);
  },
};
