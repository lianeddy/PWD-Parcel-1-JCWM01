const { db } = require("../database/index");
const {uploadImg} = require ("../helper/UploadsMulter")

module.exports = {


    uploadPayment : (req, res) => {
        uploadImg(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            res.status(201).send(err);
          } else if (err){
            res.status(201).send(err);
          }
          //console.log(req.body)
          let dataUpdate = `pic_name = "${req.file?.filename}"`
          let updateQuery = `UPDATE order_details set ${dataUpdate} where id = ${req.body.orderDetailId}`
          //console.log(updateQuery)
           db.query(updateQuery, (err,result) => {
          //     if(err) res.status(500).send(err)
          //     res.status(200).send(result)
           })
          console.log (req.file?.filename)
          res.status(200).send('File Uploaded')
        })
        
        
      }
      
}