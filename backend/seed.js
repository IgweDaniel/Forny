const stripe = require("./src/services/stripe");

const appPlans = [
  {
    amount: 0,
    currency: "usd",
    interval: "month",
    product: {
      name: "Free",
    },
    metadata: {
      maxForms: 2,
      maxEntries: 10,
      autoResponses: false,
      customRedirectURL: false,
      entriesExportAsCsv: false,
      name: "free",
    },
  },
  {
    amount: 2000,
    currency: "usd",
    interval: "month",
    product: {
      name: "Basic",
    },
    metadata: {
      maxForms: 50,
      maxEntries: 9999,
      autoResponses: false,
      customRedirectURL: false,
      entriesExportAsCsv: true,
      name: "basic",
    },
  },
  {
    amount: 4000,
    currency: "usd",
    interval: "month",
    product: {
      name: "Alpha",
    },
    metadata: {
      maxForms: 9999,
      maxEntries: 9999,
      autoResponses: true,
      customRedirectURL: true,
      entriesExportAsCsv: true,
      name: "alpha",
    },
  },
];

async function createPlans() {
  const promiseArr = appPlans.map(async (plan) => {
    return await stripe.plans.create(plan);
  });
  const res = await Promise.all(promiseArr);

  console.log({ res });
}

createPlans();
