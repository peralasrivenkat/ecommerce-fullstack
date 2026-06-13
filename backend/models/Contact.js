const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    topic: { type: String, default: "General" },
    message: { type: String, required: true },
    status: { type: String, default: "New" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
