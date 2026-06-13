const router = require("express").Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Contact saved successfully" });
});

module.exports = router;
