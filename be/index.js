const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bearerToken = require("express-bearer-token");
const { userRouters } = require("./routers");
const { db } = require("./database");

const PORT = 3302;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  passsword: "",
  database: "parcel_ecommerce",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error(`error : ${err.message}`);
  }
  console.log(`Connected to MySQL Server `);
});

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated mysql with express</h4/>");
}),
  app.get("/user", (req, res) => {
    let scriptQuery = "Select * from user ";
    if (req.query.id) {
      scriptQuery = `Select * from user where id=${db.escape(req.query.id)}`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  });

app.post("/add-user", (req, res) => {
  console.log(req.body);
  let {
    full_name,
    email,
    password,
    role,
    gender,
    addres,
    age,
    first_time,
    last_name,
    telephone,
    profile_pic,
    verified,
    created_at,
    modified_at,
  } = req.body;
  let insertQuery = `Insert into user values 
    (NULL, ${db.escape(full_name)},${db.escape(email)},${db.escape(password)},
    ${db.escape(role)},${db.escape(gender)},${db.escape(addres)},${db.escape(
    age
  )},
    ${db.escape(first_time)},${db.escape(last_name)},${db.escape(
    telephone
  )},${db.escape(profile_pic)},${db.escape(verified)},${db.escape(
    created_at
  )},${db.escape(modified_at)})`;

  console.log(insertQuery);
  db.query(insertQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res
      .status(200)
      .send({ message: "Penambahan user Berhasil", data: results });

    // db.query(`Select * from user where nama = ${db.escape(nama)}`, (err2, results2) =>{
    //     if (err2) res.status(500).send(err2)
    //     res.status(200).send({ message: 'Penambahan user Berhasil', data : results2 })
    //     // res.status(200).send (results)
    // })
  });
});

app.patch("/edit-user/:id", (req, res) => {
  let dataUpdate = [];
  for (let prop in req.body) {
    dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
  }

  let updateQuery = `UPDATE user set ${dataUpdate} where id = ${req.params.id}`;
  console.log(updateQuery);
  db.query(updateQuery, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
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

app.listen(PORT, () => console.log("Api Running :", PORT));
