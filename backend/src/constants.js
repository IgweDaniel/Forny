const FREE_PLAN = "FREE",
  BASIC_PLAN = "BASIC",
  PRO = "PRO";

const AVAILABLE_PLANS = [
  {
    name: FREE_PLAN,
    price: 0,
    limits: { maxForms: 2, maxEntryPerForm: 20 },
    features: ["EMAIL NOTIFICATIONS"],
  },
  {
    stripe_id: "price_1IAfi0Jnak3PexxS7Lxd8osM",
    name: BASIC_PLAN,
    price: 40,
    limits: {
      maxForms: 50,
      maxEntryPerForm: 99999999999,
    },
    features: ["CSV EXPORT", "EMAIL NOTIFICATIONS"],
  },
  {
    stripe_id: "price_1IAfiJJnak3PexxS2CEHYiQT",
    name: PRO,
    price: 60,
    limits: {
      maxForms: 9999,
      maxEntryPerForm: 99999999999,
    },
    features: [
      "EMAIL NOTIFICATIONS",
      "CSV EXPORT",
      "CUSTOM REDIRECT URL",
      "AUTO RESPONSES",
    ],
  },
];

module.exports = { AVAILABLE_PLANS, BASIC_PLAN, PRO, FREE_PLAN };
