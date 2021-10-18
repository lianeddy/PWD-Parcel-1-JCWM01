const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = `Select * from product;`;
    if (req.query.id) {
      scriptQuery = `Select * from product where id = ${db.escape(
        req.query.id
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      console.log("result BE[0]", results[0]);
      res.status(200).send(results[0]);
    });
  },
  addData: (req, res) => {
    console.log(req.body);
    let { full_name, price, picture, descr, category } = req.body;
    let insertQuery = `Insert into product values (null, ${db.escape(
      full_name
    )}, ${db.escape(descr)}, null, ${db.escape(category)}, null, ${db.escape(
      picture
    )}, ${db.escape(price)}, null, null, null) `;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      }

      db.query(
        `Select * from product where full_name = ${db.escape(full_name)};`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res
            .status(200)
            .send({ message: "Penambahan Product Berhasil", data: results2 });
          return;
        }
      );
    });
  },
  editData: (req, res) => {
    let dataUpdate = [];
    console.log("dataUpdate", dataUpdate);
    for (let prop in req.body) {
      dataUpdate.push(` ${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `UPDATE product set ${dataUpdate} where id = ${parseInt(
      req.params.id
    )} `;
    console.log(updateQuery);
    db.query(updateQuery, [], (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  deleteData: (req, res) => {
    let deleteQuery = `DELETE from product where id = ${db.escape(
      req.params.id
    )};`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
