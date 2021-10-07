const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, "private123key", {
      expiresIn: "12h",
    });
  },
};
