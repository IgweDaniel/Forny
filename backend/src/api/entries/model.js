const mongoose = require("mongoose");
const { Schema } = mongoose;

const entrySchema = new Schema(
  {
    form: { type: Schema.Types.ObjectId, ref: "ContactForm", required: true },
    data: {},
    // name: String,
    // email: String,
    // message: String,
    // subject: String,
  },
  {
    timestamps: true,
  }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = {
  Entry,
};
