const express = require("express");
const app = express();
const mongoose = require("./services/mongoose");
const { port, mongo } = require("./config");
const api = require("./api");
const { errorHandler } = require("bodymen");

const { Plan } = require("./api/membership/model");

const plans = [
  {
    name: "Basic",
    // pr_id: "price_1HNZmwJnak3PexxSeyqNMnHs",
    // p_id: "prod_HxUm46noOuFdZl",
    features: ["webhook", "autoResponse"],
    formLimit: 20,
    submissionLimit: 1000,
  },
  {
    name: "free",
    features: [],
    formLimit: 1,
    submissionLimit: 2,
  },
];

function initPlans() {
  plans.forEach((plan) => {
    Plan.create(plan).then((plan) =>
      console.log(`${plan.name} created this succesfully`)
    );
  });
}

mongoose.connect(mongo.uri).then((_) => {
  console.log("DataBase connected successfully");
  // initPlans();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler());

app.use("/api", api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
