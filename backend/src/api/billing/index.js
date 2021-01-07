const { token } = require("../../services/passport");

const { Router } = require("express");
const router = new Router();

const {
  createSubcription,
  updateSubscription,
  cancelSubscription,
  listPlans,
} = require("./controller");

router.get("/plans", listPlans);

router.use(token);
router.post("/", createSubcription);
router.patch("/:id", updateSubscription);
router.delete("/:id", cancelSubscription);

module.exports = router;
