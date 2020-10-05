const { ContactForm } = require("./model");
const { Entry } = require("../entries/model");
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
      targetEmail: user.email,
    });
    return success(res, 201)({ form });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

const makeSubmission = async ({ params, body }, res) => {
  const { name, email, message, subject } = body;
  form = await ContactForm.findById(params.id).populate("user");

  if (!form) {
    return res.status(404).send("<h1>Invalid Form</h1>");
  }

  if (form.entryCount >= form.user.plan.maxEntries) {
    return res
      .status(406)
      .send("<h1>You can't make submissions at this time</h1>");
  }
  const s = new Set(form.tableKeys);
  Object.keys(body).forEach((key) => s.add(key));

  form.entryCount = form.entryCount + 1;
  form.tableKeys = Array.from(s);
  try {
    Promise.resolve([
      await Entry.create({
        form: form.id,
        data: { name, email, message, subject },
      }),
      await form.save(),
    ]).then(() => {
      return res
        .status(200)
        .send("<h1>Thank you and hopefully you'll hear from me soon</h1>");
    });
  } catch (error) {
    console.log(error);
  }
};

const getFormSubmissions = async ({ params }, res) => {
  const form = await ContactForm.findById(params.id);
  if (!form) return notFound(res);
  const submissions = await Entry.find({ form: form.id });
  return success(res)({ submissions });
};

const getUserForms = ({ user }, res) =>
  ContactForm.find({ user }).then(success(res));

const getAForm = async ({ params, user }, res) => {
  const form = await ContactForm.findOne({ _id: params.id, user });
  if (!form) return notFound(res);
  return success(res)({ form });
};

const updateForm = async ({ params, body }, res) => {
  const { name, targetEmail, emailNotifyStatus } = body,
    update = {};
  if (name) {
    update.name = name;
  }
  if (emailNotifyStatus != null) {
    update.emailNotify = Boolean(emailNotifyStatus);
  }
  if (targetEmail) {
    update.targetEmail = targetEmail;
  }
  try {
    const form = await ContactForm.findByIdAndUpdate(params.id, update, {
      new: true,
    });
    if (!form) return notFound(res);
    return success(res)({ form });
  } catch (error) {
    return serverError(res);
  }
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
  getFormSubmissions,
};
