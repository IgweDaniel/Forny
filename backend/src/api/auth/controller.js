const { User } = require("../users/model");
const { notFound, success } = require("../../services/response");
const { encode } = require("../../services/jwt");

const login = async ({ bodymen: { body } }, res, next) => {
  User.findOne({ email: body.email })
    .then((user) => {
      if (!user) return notFound(res);
      return { acces_token: encode(user.id) };
    })
    .then(success(res))
    .catch((err) => {
      console.log(err);
    });
};

const googleLogin = async (req, res, next) => {
  res.json("googleLogin");
};

module.exports = {
  login,
  googleLogin,
};
