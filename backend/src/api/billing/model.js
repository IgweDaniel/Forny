const mongoose = require("mongoose");

const { Schema } = mongoose;

const billingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    stripe_subId: { type: "String", required: true },
    expired: {
      type: Boolean,
      default: false,
    },
    planName: { type: "String", required: true },
  },

  {
    timestamps: true,
  }
);

const Billing = mongoose.model("Billing", billingSchema);

module.exports = {
  Billing,
};
