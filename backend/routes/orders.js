const router = require("express").Router();
const Order = require("../models/Order");
const { authRequired, adminOnly } = require("../middleware/auth");

router.post("/", authRequired, async (req, res) => {
  const order = await Order.create({
    ...req.body,
    user: req.user.id
  });

  res.status(201).json({ message: "Order placed", order });
});

router.get("/my", authRequired, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.get("/", authRequired, adminOnly, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/:id/status", authRequired, adminOnly, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

module.exports = router;
