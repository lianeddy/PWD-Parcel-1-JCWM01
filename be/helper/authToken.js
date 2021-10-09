//  encoding = buat token
//  decoding = menerjemahkan token

const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    console.log("masuk  auth");
    console.log(req.token);
    jwt.verify(req.token, "private123", (err, decode) => {
      if (err) {
        console.log("error jwt veiryf");
        return res.status(401).send("User not auth");
      }

      console.log("berhasil auth token");

      req.user = decode;

      console.log(req.user);

      next();
    });
  },
};

// Tahapan JWT
// user data object > di encrypt jadi sting panjang > decode menjadi object >
//
