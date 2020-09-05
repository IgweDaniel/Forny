const { schema } = require("./model");

const { Router } = require("express");
const router = new Router();
const { middleware: body } = require("bodymen");

const { create } = require("./controller");

const { email, password, name } = schema;

router.post("/", body({ email, password, name }), create);

module.exports = router;
