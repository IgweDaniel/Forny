const mongoose = require("mongoose");

const { Schema } = mongoose;
const submissionSchema = new Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const formSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    submissions: [submissionSchema],
    max_submissions: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactForm = mongoose.model("ContactForm", formSchema);

module.exports = {
  ContactForm,
};
