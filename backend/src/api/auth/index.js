const { Router } = require("express");
const router = new Router();

const { middleware: body } = require("bodymen");

const { schema } = require("../users/model");
const { email, password } = schema;

const { login, googleLogin } = require("./controller");

router.post("/", body({ email, password }), login);

router.get("/google", googleLogin);

module.exports = router;
