const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const encode = async (id, options = { expiresIn: 60 * 60 }) =>
  await jwt.sign({ id }, jwtSecret, options);

const decode = (token) => jwt.verify(token, jwtSecret);

module.exports = { encode, decode };
