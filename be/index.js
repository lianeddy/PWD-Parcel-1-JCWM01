const express = require('express')
const cors = require ('cors')
const mysql = require ('mysql')

const PORT = 3302
const app = express()

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passsword: '',
    database : 'parcel_ecommerce',
    port : 3306,
    multipleStatements : true
}) 

db.connect((err) => {
    if (err) {
        return console.error(`error : ${err.message}`)
    }
    console.log(`Connected to MySQL Server `)
})

app.get('/',(req,res) => {
    res.status(200).send('<h4>Integrated mysql with express</h4/>')
}),
  app.get("/user", (req, res) => {
    let scriptQuery = "Select * from user ";
    if (req.query.id) {  
      scriptQuery = `Select * from user where id=${db.escape(
        req.query.id
      )}`; 
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  });

  app.post ('/add-user', (req, res) => {
    console.log (req.body)
    let { full_name, email, password, role, gender, addres, age, first_time,last_name,telephone,profile_pic,verified, created_at, modified_at} = req.body
    let insertQuery = `Insert into user values 
    (NULL, ${db.escape(full_name)},${db.escape(email)},${db.escape(password)},
    ${db.escape(role)},${db.escape(gender)},${db.escape(addres)},${db.escape(age)},
    ${db.escape(first_time)},${db.escape(last_name)},${db.escape(telephone)},${db.escape(profile_pic)},${db.escape(verified)},${db.escape(created_at)},${db.escape(modified_at)})`
    
    console.log(insertQuery)
    db.query(insertQuery, (err, results) => {
        if(err)res.status(500).send(err)
        res.status(200).send({ message: 'Penambahan user Berhasil', data : results })

        // db.query(`Select * from user where nama = ${db.escape(nama)}`, (err2, results2) =>{
        //     if (err2) res.status(500).send(err2)
        //     res.status(200).send({ message: 'Penambahan user Berhasil', data : results2 })
        //     // res.status(200).send (results)
        // })       
    })
})

app.patch('/edit-user/:id', (req,res)=> {   
    let dataUpdate = [] 
    for(let prop in req.body){
        dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
    }

    let updateQuery = `UPDATE user set ${dataUpdate} where id = ${req.params.id}`
    console.log(updateQuery)
    db.query(updateQuery, (err,result) => {
        if(err) res.status(500).send(err)
        res.status(200).send(result)
    })
})

// app.delete('/delete-user/: iduser', (req, res) => {
//     let deleteQuery = `DELETE from user where id user = ${db.escape(req.params.iduser)};`

//     db.query(deleteQuery, (err, result) => {
//         if (err) res.status(500).send(err)
//         res.status(200).send(results)
//     })
// })

app.get("/order", (req, res) => {
  let scriptQuery = "select od.status, od.created_at, p.nama, od.no_order, oi.quantity, p.harga, od.total from order_details as od join order_items as oi on od.id = oi.order_id join parcel as p on oi.parcel_id = p.parcel_id  ";
  let whereQuery = `where od.user_id = ${req.query.id}`
  if (req.query.status)
    whereQuery += ` and od.status=${req.query.status}`
  if (req.query.id) {  
    scriptQuery += whereQuery
  }
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});
// Middleware
const { userRouters } = require("./routers/index");
app.use("/user", userRouters);

app.listen(PORT, () => console.log('Api Running : ', PORT))