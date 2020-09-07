const { Router } = require("express");
const router = new Router();

const {
  createUser,
  getUser,
  updateUser,
  verifyUser,
  createVerficationToken,
} = require("./controller");
const { token } = require("../../services/passport");

router.post("/", createUser);

router.post("/token", createVerficationToken);
router.put("/token", verifyUser);

router.get("/me", token, getUser);

router.patch("/me", token, updateUser);

module.exports = router;
