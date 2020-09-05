const mongoose = require("mongoose");

const { Schema } = mongoose;
const subScriptionSchema = new Schema(
  { user: { type: Schema.Types.ObjectId, ref: "User" } },
  { subscriptionId: [{ type: "String", required: true }] },
  {
    timestamps: true,
  }
);

const planSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    formLimit: {
      type: Number,
      required: true,
    },
    submissionLimit: {
      type: Number,
      required: true,
    },
    features: [String],
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model("Plan", planSchema);

const SubScription = mongoose.model("SubScription", subScriptionSchema);

module.exports = {
  Plan,
  SubScription,
};
