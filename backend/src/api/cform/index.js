const { schema } = require("./model");

const { Router } = require("express");
const router = new Router();
const { middleware: body } = require("bodymen");

const {
  create,
  makeSubmission,
  getMyForms,
  getAForm,
  getSubmissions,
} = require("./controller");

const { token } = require("../../services/passport");

const { name } = schema;

router.post("/:id/submissions", makeSubmission);

router.use(token);
router.post("/", create);
router.get("/", getMyForms);
router.get("/:id", getAForm);

router.get("/:id/submissions", getSubmissions);

module.exports = router;
