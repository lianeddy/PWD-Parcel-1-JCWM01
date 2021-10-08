const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const PORT = 3302;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

// Contoh
app.get("/", (req, res) => {
  res.status(200).send("<h1>Integrated mySQL and Express</h1>");
});

app.get("/product", (req, res) => {
  let scriptQuery = "Select * from product;";
  if (req.query.id) {
    scriptQuery = `Select * from product where id=${db.escape(req.query.id)}`;
  }
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.get("/getuser", (req, res) => {
  let scriptQuery = "Select * from user;";
  if (req.query.id) {
    scriptQuery = `Select * from user where id=${db.escape(req.query.id)}`;
  }
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.get("/productcategory", (req, res) => {
  let scriptQuery = "Select * from product_category;";
  if (req.query.id) {
    scriptQuery = `Select * from product_category where id=${db.escape(
      req.query.id
    )}`;
  }
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});
// Contoh end

// Middleware
const { userRouters } = require("./routers/index");
app.use("/user", userRouters);

app.listen(PORT, () => console.log(`API Running at Port : ${PORT}`));
