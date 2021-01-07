const { success, serverError } = require("../../services/response");
const { User } = require("../users/model");
const stripe = require("../../services/stripe");
const { Billing } = require("./model");

const createSubcription = async ({ user, body }, res) => {
  const { planId, cardToken } = body;

  let cus_token = user.stripeId;
  try {
    const plan = await stripe.plans.retrieve(planId);
    if (!cus_token) {
      const { id } = await stripe.customers.create({
        email: user.email,
        source: cardToken,
      });
      cus_token = id;
      user.stripeId = cus_token;
    }

    // Cancel subscriptions first
    const subscription = await stripe.subscriptions.create({
      customer: cus_token,
      items: [{ price: planId }],
    });

    user.plan = {
      id: plan.id,
      name: plan.metadata.name,
      maxForms: Number(plan.metadata.maxForms),
      maxEntries: Number(plan.metadata.maxEntries),
      autoResponses: plan.metadata.autoResponses == "true" ? true : false,
      entriesExport: plan.metadata.entriesExport == "true" ? true : false,
      customRedirectURL:
        plan.metadata.customRedirectURL == "true" ? true : false,
    };
    user = await user.save();
    const invoice = await Billing.create({
      user,
      stripe_subId: subscription.id,
      planName: plan.metadata.name,
    });
    console.log({ invoice });
    return success(res)(invoice);
  } catch (error) {
    console.log({ error });
    if (error.type && error.type.includes("Stripe")) {
      return res.json({ error: error.raw.code, data: null });
    }
  }
};

const updateSubscription = ({ params }, res) => {
  console.log(params.id);
  res.json({ msg: " updateSubscription" });
};
const cancelSubscription = ({ params }, res) => {
  console.log(params.id);
  res.json({ msg: " cancelSubscription" });
};
const listPlans = async (req, res) => {
  try {
    const { data } = await stripe.plans.list({ active: true, limit: 3 });
    const appPlans = data.map(
      ({ id, amount, interval, currency, metadata }) => {
        const { maxForms, maxEntries, name, ...rest } = metadata;

        const features = [],
          price = amount / 100;
        for (const key in rest) {
          if (rest[key] == "true") features.push(key);
        }
        return {
          id,
          name,
          price,
          interval,
          currency,
          maxEntries,
          maxForms,
          features,
        };
      }
    );
    success(res)(appPlans);
  } catch (error) {
    console.log(error);
    serverError(res);
  }
};

module.exports = {
  createSubcription,
  updateSubscription,
  cancelSubscription,
  listPlans,
};
