const { Router } = require("express");

const auth = require("./auth");
const users = require("./users");
const contactForms = require("./contact-form");
const passwordReset = require("./password-reset");
// const memberships = require("./membership");

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/forms", contactForms);
router.use("/password-resets", passwordReset);
// router.use("/memberships", memberships);

module.exports = router;
