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
    let scriptQuery = `Select * from user where email=${db.escape(
      req.body.email
    )} and password=${db.escape(req.body.password)};`;
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
      }else{
        return res.status(404).send({message: "user not found"})
      }
    });
  },
  getAllUsers: (req, res) => {
    // if (req.user.role == "admin") {
    let updateQuery = `Select * from user;`;
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
  registerUser: (req, res) => {
    // const { nama, usia, email, berat, kota, tahun, idposisi } = req.body;
    const { full_name, email, password } = req.body;
    // const hash = await bcrypt.hash(password, 10);
    const hashContoh = Crypto.createHmac("sha1", "hash123");
    const hash = Crypto.createHmac("sha1", "hash123").update(password).digest("hex");
    console.log("[Hash contoh]", hashContoh);
    console.log(hash);

    console.log("hash : " + hash);

    const insertQuery = `INSERT into user values (null, ${db.escape(
      full_name
    )}, ${db.escape(email)}, ${db.escape(
      hash
    )}, "user", null, null, null, null, null, null, null, "no", null, null)`;

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
  keepLogin: (req, res) => {
    console.log(req.user, "hasil decode");
    let scriptQuery = `select * from user where id = ${db.escape(req.user.id)}`;
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);

      return res.status(200).send(results);
    });
  },

  getPassword: (req, res) => {
    // if (req.user.role == "admin") {
    let updateQuery = `Select * from user;`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  postEditPassword: (req, res) => {
    // if (req.user.role == "admin") {
    let updateQuery = `Select * from user;`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  patchEditPassword: (req, res) => {
    let cekQuery = `select password from user where id = ${req.params.id}`;
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    req.body.newpassword = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newpassword)
      .digest("hex");
    let getPassword = "";

    db.query(cekQuery, (err, results) => {
      // console.log(results[0].password)
      getPassword = results[0].password;

      console.log(req.body.password, "-", getPassword);
      if (req.body.password !== getPassword) {
        res.status(401).send({ message: "Password Lama Tidak Sesuai" });
      } else {
        // console.log(req.body)
        let updateQuery = `UPDATE user set password = ${db.escape(
          req.body.newpassword
        )} where id = ${req.params.id}`;
        // console.log(updateQuery)
        db.query(updateQuery, (err, result) => {
          if (err) res.status(500).send(err);
          res.status(200).send(result);
        });
      }
    });

    // console.log(req.body)
    // let updateQuery = `UPDATE user set password = ${db.escape(req.body.newpassword)} where id = ${req.params.id}`
    // console.log(updateQuery)
    // db.query(updateQuery, (err,result) => {
    //     if(err) res.status(500).send(err)
    //     res.status(200).send(result)
    // })
  },
};
