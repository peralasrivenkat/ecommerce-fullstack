const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: String,
  products: Array
});

module.exports = mongoose.model("Cart", CartSchema);
