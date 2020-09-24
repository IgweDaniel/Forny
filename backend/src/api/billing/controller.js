// const { success } = require("../../services/response");

const createSubcription = (req, res) => {
  res.json({ msg: " updateSubscription" });
};
const updateSubscription = ({ params }, res) => {
  console.log(params.id);
  res.json({ msg: " updateSubscription" });
};
const cancelSubscription = ({ params }, res) => {
  console.log(params.id);
  res.json({ msg: " updateSubscription" });
  res.json({ msg: " cancelSubscription" });
};

module.exports = {
  createSubcription,
  updateSubscription,
  cancelSubscription,
};
