const { db } = require("../database/index");

module.exports = {

   getUser : (req, res) => {
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
     },

     
    getPost : (req, res) => {
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
       
        });
    },
    
    getPatch : (req,res)=> {   
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
    }
}