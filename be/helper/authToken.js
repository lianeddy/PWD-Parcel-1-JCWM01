//  encoding = buat token
//  decoding = menerjemahkan token

const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, "private123key", (err, decode) => {
      if (er) {
        return res.status(401).send("User not auth");
      }
      req.user = decode;

      next();
    });
  },
};

// Tahapan JWT
// user data object > di encrypt jadi sting panjang > decode menjadi object >
//
