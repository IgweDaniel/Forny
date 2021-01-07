const mongoose = require("mongoose");

const { Schema } = mongoose;

const formSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    targetEmail: {
      type: String,
      required: true,
    },
    emailNotify: {
      type: Boolean,
      default: true,
    },
    entryCount: {
      type: Number,
      default: 0,
    },
    redirectUrl: {
      type: String,
      default: "",
    },
    tableKeys: {
      type: Array,
      default: ["createdAt"],
    },
  },
  {
    timestamps: true,
  }
);
formSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
formSchema.set("toJSON", {
  virtuals: true,
});

const ContactForm = mongoose.model("ContactForm", formSchema);

module.exports = {
  ContactForm,
};
