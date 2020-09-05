const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config");

const encode = (id, options = { expiresIn: "1h" }) =>
  jwt.sign({ id }, jwtSecret, options);

const decode = (token) => jwt.verify(token, jwtSecret);

module.exports = { encode, decode };
