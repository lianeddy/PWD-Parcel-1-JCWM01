const { db } = require("../database/index");

module.exports = {
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;";
    if (req.query.id) {
      scriptQuery = `Select * from user where id=${db.escape(req.query.id)}`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  registerUser: (req, res) => {
    const { nama, usia, email, berat, kota, tahun, idposisi } = req.body;

    const insertQuery = `INSERT into karyawan values (null, ${db.escape(
      nama
    )}, ${db.escape(usia)}, ${db.escape(email)}, ${db.escape(
      berat
    )}, ${db.escape(kota)}, ${db.escape(tahun)}, ${db.escape(idposisi)})`;

    console.log(insertQuery);

    db.query(insertQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }

      // query tambahan sebagai custom response method
      db.query(
        `SELECT * from karyawan where nama = ${db.escape(nama)}`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res.status(200).send({
            message: "data berhasil di input",
            result: results2,
          });
        }
      );
    });
  },
};
