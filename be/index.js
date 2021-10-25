const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bearerToken = require("express-bearer-token");

const PORT = 3302;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(express.static("public"));

// Routes
const {
  userTransaksiRouters,
  userProfileRouters,
  userRouters,
  uploadRouters,
  adminRouters,
  productRouters,
} = require("./routers/index");
const { db } = require("./database");

app.use("/order", userTransaksiRouters);
app.use("/admin", userTransaksiRouters);
// user (edit Profile)
app.use("/user", userProfileRouters);
// users (login, register, etc)
app.use("/users", userRouters);
// album (user picture)
app.use("/album", uploadRouters);
// sales report - revenue - transaction report admin
app.use("/adminreport", adminRouters);
app.use("/product", productRouters);

app.listen(PORT, () => console.log("Api Running : ", PORT));
