const mongoose = require("mongoose");

const { Schema } = mongoose;

const submissionSchema = new Schema(
  { name: String, email: String, message: String },
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
    max_submission: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Form", formSchema);

module.exports = {
  schema: model.schema,
  Form: model,
};
