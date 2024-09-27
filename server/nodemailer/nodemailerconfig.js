const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

