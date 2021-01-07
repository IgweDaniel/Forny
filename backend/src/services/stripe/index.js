const { stripeSecret } = require("../../config");

const stripe = require("stripe")(stripeSecret);

module.exports = stripe;
