const nodemailer = require("nodemailer");
const { userEmail, userPass } = require("../../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: userPass,
  },
});

module.exports = transporter;
