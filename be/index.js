const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const { db } = require("./database");

const PORT = 3302;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(express.static("public"));

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

app.get("/album/profile", (req, res) => {
  db.query("Select * from user where id=100", (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.patch("/album/editpict", (req, res) => {
  db.query(
    'UPDATE user SET profile_pic = "test" WHERE id = 3',
    (err, results) => {
      console.log("masuk");
      console.log(err);
      if (err) {
        console.log("gagal");
        res.status(500).send(err);
      }
      console.log("berhasil");
      res.status(200).send(results);
    }
  );
});

app.post("/testone", (req, res) => {
  console.log("hey");
});
// Contoh end

// Middleware
const { userRouters, uploadRouter } = require("./routers/index");
app.use("/user", userRouters);
app.use("/album", uploadRouter);

app.listen(PORT, () => console.log(`API Running at Port : ${PORT}`));
