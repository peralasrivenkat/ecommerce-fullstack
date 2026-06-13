const router = require("express").Router();
const Cart = require("../models/Cart");
const { authRequired } = require("../middleware/auth");

router.get("/", authRequired, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  res.json(cart || { user: req.user.id, products: [] });
});

router.post("/items", authRequired, async (req, res) => {
  const item = req.body;

  if (!item.name || !item.price) {
    return res.status(400).json({ message: "Product name and price are required" });
  }

  const cart = await Cart.findOneAndUpdate(
    { user: req.user.id },
    { $push: { products: item } },
    { new: true, upsert: true }
  );

  res.status(201).json(cart);
});

router.put("/items/:index", authRequired, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const index = Number(req.params.index);
  if (!Number.isInteger(index) || index < 0 || index >= cart.products.length) {
    return res.status(400).json({ message: "Invalid cart item index" });
  }

  cart.products[index] = { ...cart.products[index].toObject(), ...req.body };
  await cart.save();
  res.json(cart);
});

router.delete("/items/:index", authRequired, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const index = Number(req.params.index);
  if (!Number.isInteger(index) || index < 0 || index >= cart.products.length) {
    return res.status(400).json({ message: "Invalid cart item index" });
  }

  cart.products.splice(index, 1);
  await cart.save();
  res.json(cart);
});

router.delete("/", authRequired, async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user.id });
  res.json({ message: "Cart cleared" });
});

module.exports = router;
