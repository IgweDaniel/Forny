const { Router } = require("express");

const auth = require("./auth");
const users = require("./users");
const forms = require("./cform");
const memberships = require("./membership");

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/forms", forms);
router.use("/memberships", memberships);

module.exports = router;
