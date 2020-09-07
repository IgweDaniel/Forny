const { Router } = require("express");
const { password } = require("../../services/passport");
const { login } = require("./controller");
const router = new Router();

router.post("/", password, login);

module.exports = router;
