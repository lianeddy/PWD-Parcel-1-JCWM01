const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'parcel',
    port: 3306,
    multipleStatements: true
})

db.connect((err) => {
    if (err) {
        return console.error(`error : ${err.message}`)
    }
    console.log(`Connected to MySQL Server`)
})

module.exports = { db }