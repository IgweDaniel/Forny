const express = require("../src/services/express");
const mongoose = require("./services/mongoose");

const { port, mongo, apiRoot } = require("./config");
const api = require("./api");

// const { Plan } = require("./api/membership/model");

// const plans = [
//   {
//     name: "Basic",
//     // pr_id: "price_1HNZmwJnak3PexxSeyqNMnHs",
//     // p_id: "prod_HxUm46noOuFdZl",
//     features: ["webhook", "autoResponse"],
//     formLimit: 20,
//     submissionLimit: 1000,
//   },
//   {
//     name: "free",
//     features: [],
//     formLimit: 1,
//     submissionLimit: 2,
//   },
// ];

// function initPlans() {
//   plans.forEach((plan) => {
//     Plan.create(plan).then((plan) =>
//       console.log(`${plan.name} created this succesfully`)
//     );
//   });
// }

mongoose.connect(mongo.uri).then(() => {
  console.log("DataBase connected successfully");
  // initPlans();
});

const app = express(apiRoot, api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
