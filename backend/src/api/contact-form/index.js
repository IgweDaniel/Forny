const { Router } = require("express");
const router = new Router();

const {
  createForm,
  makeSubmission,
  getUserForms,
  getAForm,
  getFormSubmissions,
  updateForm,
  deleteForm,
} = require("./controller");

const { token } = require("../../services/passport");

// All Form Submission
router.post("/:id", makeSubmission);

router.use(token);

router.get("/:id/entries", getFormSubmissions);
// All Form Methods
router.post("/", createForm);
router.get("/", getUserForms);

// Single Form Methods
router.get("/:id", getAForm);
router.patch("/:id", updateForm);
router.delete("/:id", deleteForm);

module.exports = router;
