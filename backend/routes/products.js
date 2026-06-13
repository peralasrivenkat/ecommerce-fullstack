const router = require("express").Router();
const Product = require("../models/Product");
const { authRequired, adminOnly } = require("../middleware/auth");

router.get("/", async (req, res) => {
  const { category, q, sort } = req.query;
  const filter = {};

  if (category && category !== "all") filter.category = category;
  if (q) filter.name = { $regex: q, $options: "i" };

  let query = Product.find(filter);
  if (sort === "price-low") query = query.sort({ price: 1 });
  if (sort === "price-high") query = query.sort({ price: -1 });
  if (sort === "rating") query = query.sort({ rating: -1 });
  if (sort === "az") query = query.sort({ name: 1 });

  const products = await query;
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.post("/", authRequired, adminOnly, async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.put("/:id", authRequired, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.delete("/:id", authRequired, adminOnly, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

module.exports = router;
