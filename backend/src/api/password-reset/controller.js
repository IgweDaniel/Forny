const nodemailer = require("../../services/nodemailer");
const { success } = require("../../services/response");

const createToken = async (req, res) => {
  const mailOptions = {
    from: "cform.com",
    to: "koxade6577@wonrg.com",
    subject: "Password Reset",
    text: `
    Here is a link to reset your password
    `,
  };

  nodemailer.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  return success(res)({ d: ", createToken" });
};
const updatePassword = async (req, res) => {
  return success(res)({ d: ", updatePassword" });
};

module.exports = { createToken, updatePassword };
