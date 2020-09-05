// const { schema } = require("./model");
const { token } = require("../../services/passport");

const { Router } = require("express");
const router = new Router();
const { middleware: body } = require("bodymen");
const {
  Plan: { schema },
} = require("./model");
const { id } = schema;

const {
  createSubcription,
  updateSubscription,
  cancelSubscription,
} = require("./controller");

// const { name } = schema;
router.use(token);
router.post("/", createSubcription);

router.patch("/:id", updateSubscription);

router.delete("/:id", cancelSubscription);

module.exports = router;
