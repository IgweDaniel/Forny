const { Router } = require("express");

const auth = require("./auth");
const users = require("./users");
const contactForms = require("./contact-form");
const passwordReset = require("./password-reset");
const billing = require("./billing");

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/forms", contactForms);
router.use("/password-resets", passwordReset);
router.use("/billing", billing);

module.exports = router;
