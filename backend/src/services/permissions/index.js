const { Form } = require("../../api/cform/model");

const hasFeature = function (feature) {
  const hasSpecificFeature = function ({ user }, res, next) {
    // match if the feature is enabled
    // Might handle Error Here
    return user && user.includes(feature)
      ? next(null, user)
      : next(null, false);
  };
  return hasSpecificFeature;
};

function getFormLimits(user, delta = 1) {
  return Form.find({ user }).then((forms) => {
    const count = forms.length,
      newTotal = parseInt(count) + delta,
      maxChecks = user.plan.formLimit;
    return newTotal > maxChecks;
  });
}

module.exports = {
  getFormLimits,
  hasFeature,
};
