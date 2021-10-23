const { db } = require("../database/index");

module.exports = {
  getOrderList: (req, res) => {
    // console.log("[req]", req);
    // console.log("[req.query]", req.query);
    // const getOrderQuery = `SELECT * from order_details;`;
    const getOrderQuery = `SELECT user.full_name, order_details.total, order_details.status, order_details.created_at from user 
    INNER JOIN order_details on user.id = order_details.user_id
    WHERE MONTH(order_details.created_at) = ${req.query.month} AND YEAR(order_details.created_at) = ${req.query.year}
    ORDER BY order_details.created_at DESC;`;

    db.query(getOrderQuery, (err, results) => {
      // console.log("getOrderQuery masuk");
      if (err) {
        // console.log("getOrderQuery gagal");
        res.status(500).send(err);
      }
      // console.log("getOrderQuery berhasil");
      res.status(200).send(results);
    });
  },
};
