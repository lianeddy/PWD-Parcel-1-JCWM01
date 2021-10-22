const { db } = require("../database/index");
const {uploader} = require("../helper/UploadsMulter")
const multer = require('multer');

module.exports = {

  getOrder : (req, res) => {
    let scriptQuery = "select od.status, od.created_at, GROUP_CONCAT(p.nama, ' x ', oi.quantity, ' : ', 'Rp. ', (oi.quantity * p.harga) SEPARATOR '\r\n') as products, od.no_order, od.id as order_detail_id, oi.quantity, p.harga, sum(od.total) as total from order_details as od join order_items as oi on od.id = oi.order_id join parcel as p on oi.parcel_id = p.parcel_id";
    let whereQuery = ` where od.user_id = ${req.query.id}`
    if (req.query.status)
      whereQuery += ` and od.status=${req.query.status}`
      whereQuery += ` group by od.id`
    if (req.query.id) {  
      scriptQuery += whereQuery
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      let item = []
      res.status(200).send(results);
  
    });
  },

    uploadPayment : (req, res) => {
      let path = '/uploads'
      const upload = uploader(path, 'IMG').fields([{name : 'file'}])
        upload(req, res, (err) => {
          
          // if (err instanceof multer.MulterError) {
          //   res.status(201).send(err);
          // } else if (err){
          //   res.status(201).send(err);
          // }
          const {file} = req.files
          console.log (file[0])
          // console.log (err)
          // console.log(req.body.data)
          let dataUpdate = `pic_name = "${file[0].filename}"`
          let updateQuery = `UPDATE order_details set ${dataUpdate} where id = ${req.body.orderDetailId}`
          //console.log(updateQuery)
           db.query(updateQuery, (err,result) => {
          //     if(err) res.status(500).send(err)
          //     res.status(200).send(result)
           })
          console.log (req.file?.filename)
          res.status(200).send('File Uploaded')
        })
          
      },

      // as admin
      getAdmin : (req, res) => {
        let scriptQuery = "select od.status, od.created_at, GROUP_CONCAT(p.nama, ' x ', oi.quantity, ' : ', 'Rp. ', (oi.quantity * p.harga) SEPARATOR '\r\n') as products, od.no_order, od.id as order_detail_id, oi.quantity, p.harga, sum(od.total) as total from order_details as od join order_items as oi on od.id = oi.order_id join parcel as p on oi.parcel_id = p.parcel_id";
        
        if (req.query.status) {
          scriptQuery += ` where od.status=${req.query.status}`
        }
        scriptQuery += ` group by od.id`
          
        
        db.query(scriptQuery, (err, results) => {
          if (err) res.status(500).send(err);
          let item = []
          res.status(200).send(results);
      
        });
      },

      getAdminEdit : (req,res)=> {   
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
    },
    confirm : (req,res)=> {   
      let dataUpdate = [] 
      for(let prop in req.body){
          dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
      }
  
      let updateQuery = `UPDATE order_details set ${dataUpdate} where id = ${req.body.id}`
      console.log(updateQuery)
      db.query(updateQuery, (err,result) => {
          if(err) res.status(500).send(err)
          res.status(200).send(result)
      })
  },
    rejected : (req,res)=> {   
      let dataUpdate = [] 
      for(let prop in req.body){
          dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`)
      }

      let updateQuery = `UPDATE order_details set ${dataUpdate} where id = ${req.body.id}`
      console.log(updateQuery)
      db.query(updateQuery, (err,result) => {
          if(err) res.status(500).send(err)
          res.status(200).send(result)
      })
}
      
}

