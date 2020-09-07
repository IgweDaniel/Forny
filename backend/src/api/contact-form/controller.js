const { ContactForm } = require("./model");
const { getFormLimits } = require("../../services/permissions");
const { success, notFound, serverError } = require("../../services/response");

const createForm = async ({ body: { name }, user }, res) => {
  try {
    const atLimit = await getFormLimits(user);
    if (atLimit) {
      return res.status(403).json({ error: "Limit Exceeded", data: null });
    }

    const form = await ContactForm.create({
      user: user.id,
      name,
      max_submissions: user.plan.max_submissions,
    });
    return success(res, 201)({ form });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

const makeSubmission = async (req, res) => {
  const {
      params,
      body: { name, email, message },
    } = req,
    form = await ContactForm.findById(params.id).populate("Submission");

  if (!form) {
    return res.status(404).send("<h1>Invalid Form</h1>");
  }

  if (form.submissions.length >= form.max_submissions) {
    return res
      .status(406)
      .send("<h1>You can't make submissions at this time</h1>");
  }
  form.submissions.push({ name, email, message });
  form.save().then(() => {
    return res
      .status(200)
      .send("<h1>Thank you and hopefully you'll hear from me soon</h1>");
  });
};

const getUserForms = ({ user }, res) =>
  ContactForm.find({ user }).then(success(res));

const getAForm = async ({ params, user }, res) => {
  const form = await ContactForm.findOne({ _id: params.id, user });
  if (!form) return notFound(res);
  return success(res)({ form });
};

const updateForm = ({ params }, res) => {
  console.log(params.id);
  res.json({ msg: "updateForm" });
};
const deleteForm = ({ params }, res) => {
  console.log(params.id);
  res.json({ msg: "deleteForm" });
};

module.exports = {
  makeSubmission,
  createForm,
  getUserForms,
  getAForm,
  updateForm,
  deleteForm,
};
