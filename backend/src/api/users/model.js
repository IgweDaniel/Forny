const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { Schema } = mongoose;
const { FREE_PLAN, AVAILABLE_PLANS } = require("../../constants");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      index: true,
      trim: true,
    },
    stripeId: String,
    cards: Array,
    membership: {
      type: String,
      default: FREE_PLAN,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.show = function (full) {
  const obj = {};
  let fields = ["id", "name", "email"];

  if (full) {
    fields = [...fields, "email", "createdAt"];
  }
  fields.forEach((f) => (obj[f] = this[f]));
  obj.plan = this.getPlan();
  return obj;
};

userSchema.methods.getPlan = function () {
  return AVAILABLE_PLANS.find((plan) => plan.name === this.membership);
};
const model = mongoose.model("User", userSchema);

module.exports = {
  schema: model.schema,
  User: model,
};
