const { db } = require("../database/index");

module.exports = {
  getOrderList: (req, res) => {
    // const getOrderQuery = `SELECT * from order_details;`;
    const getOrderQuery = `SELECT user.full_name, order_details.total, order_details.status, order_details.created_at from user 
    INNER JOIN order_details on user.id = order_details.user_id;`;

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
