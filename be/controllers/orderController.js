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
  app.get("/order", (req, res) => {
    let scriptQuery = "select od.status, od.created_at, p.nama, od.no_order, oi.quantity, p.harga, od.total from order_details as od join order_items as oi on od.id = oi.order_id join parcel as p on oi.parcel_id = p.parcel_id  ";
    if (req.query.id) {  
      scriptQuery += `where od.user_id = 1`
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
// done