const { Form } = require("./model");
const { getFormLimits } = require("../../services/permissions");
const { success, notFound } = require("../../services/response");

const create = ({ body: { name }, user }, res, next) => {
  getFormLimits(user).then((atLimit) => {
    if (atLimit) {
      return res.json({ error: "Limit Exceeded" });
    }
    console.log(user.plan);
    return Form.create({
      user: user.id,
      name,
      max_submission: user.plan.submissionLimit,
    })
      .then((form) => form)
      .then(success(res))
      .catch(next);
  });
};
const makeSubmission = (
  { params: { id }, body: { name, email, message } },
  res
) => {
  Form.findById(id).then((form) => {
    if (!form) {
      return res.send("<h1>Invalid Form/h1>");
    }
    if (form.submissions.length >= form.max_submission) {
      return res.send("<h1>You can't make submissions at this time</h1>");
    }
    form.submissions.push({ name, email, message });
    return form
      .save()
      .then((_) =>
        res.send("<h1>Thank you and hopefully you'll hear from me soon</h1>")
      );
  });
};

const getMyForms = ({ user }, res) => {
  Form.find({ user }).then(success(res));
};

const getAForm = ({ params: { id } }, res) => {
  Form.findOne({ _id: id }).then((form) =>
    form ? success(res)(form) : notFound(res)
  );
};

const getSubmissions = (req, res) => {
  res.json({ msg: "getSubmissions" });
};

module.exports = {
  makeSubmission,
  create,
  getMyForms,
  getSubmissions,
  getAForm,
};
