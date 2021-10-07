const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "id.private.bootcamp@gmail.com",
    pass: "azuqzntrpzbdtyyf",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
