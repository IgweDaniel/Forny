const { token } = require("../../services/passport");

const { Router } = require("express");
const router = new Router();

const {
  createSubcription,
  updateSubscription,
  cancelSubscription,
  listPlans,
} = require("./controller");

router.use(token);

router.post("/", createSubcription);

router.patch("/:id", updateSubscription);

router.delete("/:id", cancelSubscription);

router.get("/plans", listPlans);

module.exports = router;
