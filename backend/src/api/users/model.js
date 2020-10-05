const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const { Schema } = mongoose;

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
    plan: {
      id: String,
      name: {
        type: String,
        default: "free",
      },
      maxEntries: {
        type: Number,
        default: 10,
      },
      maxForms: {
        type: Number,
        default: 2,
      },
      customRedirectURL: {
        type: Boolean,
        default: false,
      },
      entriesExport: {
        type: Boolean,
        default: false,
      },
      autoResponses: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw Error("internal Server Error", err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.authenticate = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.show = function (full) {
  const obj = {};
  let fields = ["id", "name", "email", "plan"];

  if (full) {
    fields = [...fields, "email", "createdAt"];
  }

  fields.forEach((f) => (obj[f] = this[f]));
  return obj;
};

const model = mongoose.model("User", userSchema);

module.exports = {
  schema: model.schema,
  User: model,
};
