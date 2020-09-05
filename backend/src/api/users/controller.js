const { User, schema } = require("./model");
const { encode } = require("../../services/jwt");
const { success } = require("../../services/response");

const create = ({ bodymen: { body } }, res, next) =>
  User.create({ body })
    .then((user) => user.show())
    .then((user) => ({
      acces_token: encode(user.id),
    }))
    .then(success(res))
    .catch((err) => {
      console.log(err);
      throw Error(err);
    });

module.exports = {
  create,
};
