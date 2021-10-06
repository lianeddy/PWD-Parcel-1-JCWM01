const { db } = require('../database')
const { createToken } = require('../helper/createToken')
const Crypto = require('crypto')

module.exports = {
    getData: (req, res) => {
        req.body.password = Crypto.createHmac("sha1", "hash123").update(req.body.password).digest("hex")
        let scriptQuery = `Select * from user where email=${db.escape(req.body.email)} and password=${db.escape(req.body.password)};`
        console.log(req.body, scriptQuery)
        db.query(scriptQuery, (err, results) => {
            if (err) res.status(500).send(err)
            if (results[0]) {
                let { id, full_name, email, password, role, verified } = results[0]
                let token = createToken({ id, full_name, email, password, role, verified })
                if (verified != "yes") {
                    res.status(200).send({ message: "Your account not verified" })
                } else {
                    res.status(200).send({ dataLogin: results[0], token, message: "Login Success" })
                }
            }
        })
    },
    getAllUsers: (req, res) => {
        // if (req.user.role == "admin") {
        let updateQuery = `Select * from user;`
        console.log(updateQuery)
        db.query(updateQuery, (err, results) => {
            if (err) res.status(500).send(err)
            res.status(200).send(results)
        })
        // } else {
        //     res.status(200).send({ message: "You not admin, can't access data" })
        // }
    }
}