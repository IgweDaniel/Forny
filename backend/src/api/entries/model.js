const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema(
  {
    form: { type: Schema.Types.ObjectId, ref: "ContactForm", required: true },
    data: {},
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = {
  Entry,
};
