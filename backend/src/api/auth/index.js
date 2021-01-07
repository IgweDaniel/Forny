const { Router } = require("express");
const { password } = require("../../services/passport");
const { login, google } = require("./controller");
const router = new Router();

router.post("/", password, login);
router.post("/google", google);

module.exports = router;
