const { success } = require("../../services/response");
const { encode } = require("../../services/jwt");

const login = async ({ user }, res) => {
  const token = await encode(user.id);
  return success(res)({ acces_token: token });
};

module.exports = { login };
