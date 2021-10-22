const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");

module.exports = {
  getData: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    console.log("req.body", req.body);
    let scriptQuery = `Select * from user where email=${db.escape(
      req.body.email
    )} and password=${db.escape(req.body.password)};`;
    console.log(req.body, scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      console.log(results);
      if (results.length > 0) {
        let { id, full_name, email, password, role, verified } = results[0];
        console.log("results[0]", results[0]);
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
  keepLogin: (req, res) => {
    console.log(req.user, "hasil decode");
    let scriptQuery = `select * from user where id = ${db.escape(
      req.user.id
    )}`;
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

  patchEditPassword: (req,res)=> {
    let cekQuery = `select password from user where id = ${req.params.id}`
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    req.body.newpassword = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newpassword)
      .digest("hex");
    let getPassword = ''
      
   db.query(cekQuery, (err,results) => {
    // console.log(results[0].password)
        getPassword = results[0].password

        console.log(req.body.password,'-',getPassword)
        if (req.body.password !== getPassword) {
          res.status(401).send({message:'Password Lama Tidak Sesuai'})
        } else {
          // console.log(req.body)
          let updateQuery = `UPDATE user set password = ${db.escape(req.body.newpassword)} where id = ${req.params.id}`
          // console.log(updateQuery)
          db.query(updateQuery, (err,result) => {
            if(err) res.status(500).send(err)
            res.status(200).send(result)
          })
        }
    })
    

  

    // console.log(req.body)
    // let updateQuery = `UPDATE user set password = ${db.escape(req.body.newpassword)} where id = ${req.params.id}`
    // console.log(updateQuery)
    // db.query(updateQuery, (err,result) => {
    //     if(err) res.status(500).send(err)
    //     res.status(200).send(result)
    // })
  }

};
