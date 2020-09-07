const nodemailer = require("nodemailer");
const { userEmail, userPass } = require("../../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail, // generated ethereal user
    pass: userPass, // generated ethereal password
  },
});

module.exports = transporter;
