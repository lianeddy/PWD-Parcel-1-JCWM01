const express = require('express')
const cors = require ('cors')
const mysql = require ('mysql')

const PORT = 3302
const app = express()

const multer = require('multer');

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




// Middleware
const { userTransaksiRouters} = require("./routers/index");

app.use("/order", userTransaksiRouters);
app.use("/admin", userTransaksiRouters);

app.listen(PORT, () => console.log('Api Running : ', PORT))