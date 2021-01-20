const { User } = require("./model");
const { encode } = require("../../services/jwt");
const { success, serverError } = require("../../services/response");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ email, password: hash, name }),
      token = await encode(user.id);
    return success(res, 201)({ access_token: token, user: user.show() });
  } catch (error) {
    if (error.code == "11000" && error.name == "MongoError") {
      return res.status(409).json({ error: "Duplicate Email", data: null });
    }
    return serverError(res);
  }
};

const getUser = async ({ user }, res) => {
  console.log(user.show(true));
  return success(res)({ user: user.show(true) });
};
const updateUser = async ({ user }, res) => {
  return success(res)({ user: user.show(true) });
};



const verifyUser = async ({ user }, res) => {
  return success(res)("verifyUser");
};
const createVerficationToken = async ({ user }, res) => {
  return success(res)("createVerficationToken");
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  verifyUser,
  createVerficationToken,
};
