const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const bcrypt = require("bcryptjs");
const transporter = require("../helper/nodemailer");
const { stringify } = require("querystring");

module.exports = {
  getData: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    console.log(req.body);
    let scriptQuery = `Select * from users where email=${db.escape(
      req.body.email
    )} and password=${db.escape(req.body.password)};`;
    console.log(req.body, scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      console.log(results);
      if (results.length > 0) {
        let { id, full_name, email, password, role, verified } = results[0];
        let token = createToken({
          id,
          full_name,
          email,
          password,
          role,
          verified,
        });
        if (verified != "yes") {
          return res.status(200).send({ message: "Your account not verified" });
        } else {
          return res
            .status(200)
            .send({ dataLogin: results[0], token, message: "Login Success" });
        }
      }
    });
  },
  getAllUsers: (req, res) => {
    // if (req.user.role == "admin") {
    let updateQuery = `Select * from users;`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
    // } else {
    //     res.status(200).send({ message: "You not admin, can't access data" })
    // }
  },
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;";
    if (req.query.id) {
      scriptQuery = `Select * from user where id=${db.escape(req.query.id)}`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  registerUser: async (req, res) => {
    // const { nama, usia, email, berat, kota, tahun, idposisi } = req.body;
    const { full_name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    // const hash = Crypto.createHmac("shal", "hash123");
    console.log("hash : " + hash);

    const insertQuery = `INSERT into user values (null, ${db.escape(
      full_name
    )}, ${db.escape(email)}, ${db.escape(
      hash
    )}, "user", null, null, null, null, null, null, "no", null, null)`;

    console.log("insertQuery : " + insertQuery);

    db.query(insertQuery, (err, results) => {
      if (err) {
        res.status(500).send(err);
      }

      // query tambahan sebagai custom response method
      db.query(
        `SELECT * from user where email = ${db.escape(
          email
        )} and password = ${db.escape(hash)}`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          console.log(insertQuery);
          console.log("email setelah ISNET" + results2[0]);
          // bahan untuk membuat token
          let { full_name, email, role, verified } = results2[0];
          console.log("stringfy : " + stringify(results2[0]));
          console.log("full_name : " + full_name);
          console.log("email : " + email);
          // membuat token
          let token = createToken({ full_name, email, role, verified });

          console.log("token : " + token);

          let mail = {
            from: `admin <id.private.bootcamp@gmail.com>`,
            to: `${email}`,
            subject: `Account Verification`,
            html: `<a href="http://localhost:3302/user/verification/${token}">Click here to verified your account.</a>`,
          };

          console.log("mail : " + mail.to);

          transporter.sendMail(mail, (errMail, resMail) => {
            console.log("transporter IN");
            if (errMail) {
              console.log(errMail);
              res.status(500).send({
                message: "Registration failed",
                success: false,
                err: errMail,
              });
            }
            console.log("kirim email berhasil");
            res.status(200).send({
              message: "Registration success, check your email",
              success: true,
            });
          });
        }
      );
    });
  },
  verification: (req, res) => {
    let updateQuery = `UPDATE user set verified = 'yes' where email = ${db.escape(
      req.user.email
    )} and password = ${db.escape(req.user.password)}`;

    db.query(updateQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("error");
      }
      res.status(200).send({
        message: "berhasil verifikasi account",
        success: true,
      });
    });
  },
};