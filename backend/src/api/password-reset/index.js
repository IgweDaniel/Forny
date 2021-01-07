const { Router } = require("express");

const { createToken, updatePassword } = require("./controller");
const router = new Router();

router.post("/", createToken);
router.put("/", updatePassword);

module.exports = router;
