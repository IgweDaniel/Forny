const stripe = require("./src/services/stripe");

async function createPlans() {
  const plan = await stripe.plans.create({
    amount: 2000,
    currency: "usd",
    interval: "month",
    product: {
      name: "agency",
    },
    metadata: {
      max_submissions: 10,
      max_forms: 4,
      webhook: true,
      autoResponses: false,
      fileUpload: true,
      customRedirectURL: tru,
    },
  });

  console.log(plan);
}

createPlans();
