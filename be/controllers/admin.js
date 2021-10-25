const { db } = require("../database/index");

module.exports = {
  getOrderList: (req, res) => {
    // console.log("[req]", req);
    // console.log("[req.query]", req.query);
    // const getOrderQuery = `SELECT * from order_details;`;
    const getOrderQuery = `SELECT user.id,user.full_name, user.profile_pic, order_details.total, order_details.status, order_details.created_at from user 
    INNER JOIN order_details on user.id = order_details.user_id
    WHERE MONTH(order_details.created_at) = ${db.escape(
      req.query.month
    )} AND YEAR(order_details.created_at) = ${db.escape(req.query.year)}
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
  getYearlySales: (req, res) => {
    const getYearlySales = `SELECT order_items.order_id, order_items.product_id, order_items.quantity, product.selling_price, product.admin_price, order_items.created_at from order_items
    INNER JOIN product on product.id = order_items.product_id 
    INNER JOIN order_details on order_details.id = order_items.order_id
    where YEAR(order_items.created_at) = ${db.escape(
      req.query.year
    )}  and order_details.status = "done"
    ORDER BY order_items.created_at ASC`;

    db.query(getYearlySales, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  getProductData: (req, res) => {
    const getProduct = `SELECT id, p_name, admin_price, selling_price, stock FROM product;`;

    db.query(getProduct, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  patchStock: (req, res) => {
    console.log(req.body);
    const reStock = `UPDATE product SET stock =${db.escape(
      req.body.stock
    )} where id= ${db.escape(req.body.id)};`;

    db.query(reStock, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  edGetYearlySales: (req, res) => {
    const getEdYearly = `SELECT order_items.parcel_id, s.admin_price, s.selling_price, s.quantity, order_items.quantity as parcel_qty, order_items.created_at from parcel
    INNER JOIN order_items on parcel.parcel_id = order_items.parcel_id
    INNER JOIN (SELECT * from parcel_content INNER JOIN product on parcel_content.product_id = product.id) s on parcel.parcel_id = s.parcel_id
    where YEAR(order_items.created_at) = ${db.escape(req.query.year)} 
    ORDER BY order_items.created_at ASC;`;

    db.query(getEdYearly, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  },
  // edGetOrderList: (req, res) => {
  //   // console.log("[req]", req);
  //   // console.log("[req.query]", req.query);
  //   // const getOrderQuery = `SELECT * from order_details;`;
  //   const getOrderQuery = `SELECT user.id,user.full_name, user.profile_pic, order_details.total, order_details.status, order_details.created_at from user
  //   INNER JOIN order_details on user.id = order_details.user_id
  //   WHERE MONTH(order_details.created_at) = ${db.escape(
  //     req.query.month
  //   )} AND YEAR(order_details.created_at) = ${db.escape(req.query.year)}
  //   ORDER BY order_details.created_at DESC;`;

  //   db.query(getOrderQuery, (err, results) => {
  //     // console.log("getOrderQuery masuk");
  //     if (err) {
  //       // console.log("getOrderQuery gagal");
  //       res.status(500).send(err);
  //     }
  //     // console.log("getOrderQuery berhasil");
  //     res.status(200).send(results);
  //   });
  // },
};
