const { Plan } = require("./model");
const { success } = require("../../services/response");

// const createSubcription = (req, res) => {
//   const { plan, stripe_token } = req.body;

//   Plan.findById(plan_id).then((plan) => {
//     if (plan.name == "free" || plan.id == plan) {
//       // do something
//       res.json({ err: "You are already on this plan" });
//     }
//     return stripe.subscriptions
//       .create({
//         customer: customer.id,
//         items: [
//           {
//             plan: plan,
//           },
//         ],
//       })
//       .then((data) => console.log(data));
//   });

//   res.json({ msg: "createSubcription" });
// };

const createSubcription = ({ user, body: { plan_id } }, res) =>
  Plan.findById(plan_id)
    .then((plan) => {
      user.plan = plan.id;
      return user.save().then((user) => user._doc);
    })
    .then(success(res));

const updateSubscription = (req, res) => {
  res.json({ msg: " updateSubscription" });
};
const cancelSubscription = (req, res) => {
  res.json({ msg: " cancelSubscription" });
};

module.exports = {
  createSubcription,
  updateSubscription,
  cancelSubscription,
};
