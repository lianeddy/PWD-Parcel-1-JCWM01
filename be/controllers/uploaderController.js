const db = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  uploadFile: (req, res) => {
    try {
      let path = "images";
      const upload = uploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        const { file } = req.file;
        const filepath = file ? path + "/" + file[o].filename : null;

        let data = JSON.parse(req.body.data);

        let sqlInsert = `INSERT into user set ?`;
        db.query(sqlInsert, data, (err, result) => {
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
};
