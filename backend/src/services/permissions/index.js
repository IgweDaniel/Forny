const { ContactForm } = require("../../api/contact-form/model");

const checkMembership = () => {};

const hasFeature = function (feature) {
  const hasSpecificFeature = function ({ user }, res, next) {
    if (user.plans.features.includes(feature)) {
      return next(null, user);
    }
    return res.status(409).json({ error: "feature not enabled", data: null });
  };
  return hasSpecificFeature;
};

function getFormLimits(user, delta = 1) {
  const user_plan = user.getPlan();

  return ContactForm.find({ user }).then((forms) => {
    const count = forms.length,
      newTotal = parseInt(count) + delta,
      maxChecks = user_plan.limits.maxForms;
    return newTotal > maxChecks;
  });
}

module.exports = {
  getFormLimits,
  hasFeature,
  checkMembership,
};
