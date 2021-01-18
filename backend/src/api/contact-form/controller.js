const { v4: uuidv4 } = require("uuid");
const { ContactForm } = require("./model");
const { Entry } = require("../entries/model");
const { getFormLimits } = require("../../services/permissions");
const { success, notFound, serverError } = require("../../services/response");
const ObjectId = require("mongoose").Types.ObjectId;

const createForm = async ({ body: { name }, user }, res) => {
  try {
    const atLimit = await getFormLimits(user);
    if (atLimit) {
      return res.status(403).json({ error: "Limit Exceeded", data: null });
    }
    const publicId = uuidv4().split("-").join("");

    const form = await ContactForm.create({
      user: user.id,
      name,
      targetEmail: user.email,
      publicId,
    });
    return success(res, 201)({ form });
  } catch (error) {
    console.log(error);
    return serverError(res);
  }
};

const createFormEntry = async ({ params, body }, res) => {
  const form = await ContactForm.findOne({ publicId: params.id }).populate(
    "user"
  );
  console.log({ body });
  const entry_fields = Object.keys(body);
  if (entry_fields <= 0) {
    return res.status(400).end();
  }
  if (!form) {
    return res.status(404).send("<h1>Form does not exist</h1>");
  }
  const user_plan = form.user.getPlan();
  if (form.entryCount >= user_plan.maxEntryPerForm) {
    return res
      .status(406)
      .send("<h1>You can't make submissions at this time</h1>");
  }
  const keySet = new Set(form.tableKeys);
  entry_fields.forEach((key) => keySet.add(key));

  form.entryCount = form.entryCount + 1;
  form.tableKeys = Array.from(keySet);

  try {
    Promise.resolve([
      await Entry.create({
        form: form.id,
        data: { ...body },
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

const getFormEntries = async ({ params }, res) => {
  const form = await ContactForm.findById(params.id);
  if (!form) return notFound(res);
  const submissions = await Entry.find({ form: form.id });
  return success(res)({ submissions });
};

const getUserForms = ({ user }, res) =>
  ContactForm.find({ user }).then(success(res));

const getAForm = async ({ params, user }, res) => {
  if (!ObjectId.isValid(params.id)) return notFound(res);
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
const deleteForm = async ({ params, user }, res) => {
  if (!ObjectId.isValid(params.id)) return notFound(res);
  const form = await ContactForm.findOneAndDelete({ _id: params.id, user });
  if (!form) return notFound(res);
  return success(res)({ form });
};

module.exports = {
  createFormEntry,
  createForm,
  getUserForms,
  getAForm,
  updateForm,
  deleteForm,
  getFormEntries,
};
