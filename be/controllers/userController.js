const { db } = require("../database/index");
const bcrypt = require("bcryptjs");

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
  registerUser: async (req, res) => {
    // const { nama, usia, email, berat, kota, tahun, idposisi } = req.body;
    const { full_name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const insertQuery = `INSERT into user values (null, ${db.escape(
      full_name
    )}, ${db.escape(email)}, ${db.escape(
      hash
    )}, "user", null, null, null, null, null, null, "no", null, null)`;

    console.log(insertQuery);
    console.log(hash);

    db.query(insertQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }

      // query tambahan sebagai custom response method
      db.query(
        `SELECT * from user where full_name = ${db.escape(full_name)}`,
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
