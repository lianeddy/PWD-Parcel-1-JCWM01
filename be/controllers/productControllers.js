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
      res.status(200).send(results);
    });
  },
  addData: (req, res) => {
    console.log(req.body);
    let {
      full_name,
      desc,
      quantity,
      category,
      inventory_id,
      picture,
      price,
      created_at,
      modified_at,
    } = req.body;
    let insertQuery = `Insert into product values (${db.escape(id)},${db.escape(
      full_name
    )},${db.escape(desc)},${db.escape(quantity)},${db.escape(
      category
    )},${db.escape(inventory_id)},${db.escape(picture)},${db.escape(
      price
    )},${db.escape(created_at)},${db.escape(modified_at)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      db.query(
        `Select * from product where full_name = ${db.escape(full_name)};`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res
            .status(200)
            .send({ message: "Penambahan Product Berhasil", data: results2 });
          // res.status(200).send(results)
        }
      );
    });
  },
  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `UPDATE product set ${dataUpdate} where id = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
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
