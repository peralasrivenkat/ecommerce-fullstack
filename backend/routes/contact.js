const router = require("express").Router();
const Contact = require("../models/Contact");
const { authRequired, adminOnly } = require("../middleware/auth");

router.post("/", async (req, res) => {
  const { name, email, message, topic } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" });
  }

  const contact = await Contact.create({ name, email, message, topic });
  res.status(201).json({ message: "Contact request saved", contact });
});

router.get("/", authRequired, adminOnly, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
