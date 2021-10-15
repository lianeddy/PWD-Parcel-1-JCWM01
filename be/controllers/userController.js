const { db } = require("../database/index");
const bcrypt = require("bcryptjs");
const Crypto = require("crypto");
const { createToken } = require("../helper/createToken");
const transporter = require("../helper/nodemailer");
const { stringify } = require("querystring");
const { auth } = require("../helper/authToken");

module.exports = {
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
  checkEmail: (req, res) => {
    console.log(req.query);
    console.log(req.query.email);
    let scriptQuery = `Select * from user where email=${db.escape(
      req.query.email
    )};`;
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  registerUser: async (req, res) => {
    // const { nama, usia, email, berat, kota, tahun, idposisi } = req.body;
    const { full_name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    // const hash = Crypto.createHmac("sha1", "hash123").digest("hex");
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
          let { full_name, email, role, verified, id } = results2[0];

          console.log("stringfy : " + stringify(results2[0]));
          console.log("full_name : " + full_name);
          console.log("email : " + email);
          console.log("verified : " + verified);
          console.log("id : " + id);
          // membuat token
          let token = createToken({ full_name, email, role, verified, id });

          console.log("token : " + token);

          let mail = {
            from: `admin <id.private.bootcamp@gmail.com>`,
            to: `${email}`,
            subject: `Account Verification`,
            html: `<a href="http://localhost:3000/authentication/${token}">Click here to verified your account.</a>`,
          };

          console.log("mail html:" + mail.html);
          console.log("mail : " + mail.to);

          console.log("Bawah AUTH");
          console.log("auth(token)");

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
    console.log("masuk veruft");
    // console.log(req.user);
    let updateQuery = `UPDATE user set verified = 'yes' where id = ${db.escape(
      req.user.id
    )}`;

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
