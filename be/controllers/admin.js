const { db } = require("../database/index");

module.exports = {
  getOrderList: (req, res) => {
    const getOrderQuery = `SELECT * from order_details;`;
    db.query(getOrderQuery, (err, results) => {
      console.log("getOrderQuery masuk");
      if (err) {
        console.log("getOrderQuery gagal");
        res.status(500).send(err);
      }
      console.log("getOrderQuery berhasil");
      res.status(200).send(results);
    });
  },
};
