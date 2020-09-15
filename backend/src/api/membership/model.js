const mongoose = require("mongoose");

const { Schema } = mongoose;

const membershipSchema = new Schema(
  { user: { type: Schema.Types.ObjectId, ref: "User" } },
  { stripeId: [{ type: "String", required: true }] },
  {
    timestamps: true,
  }
);

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = {
  Membership,
};
