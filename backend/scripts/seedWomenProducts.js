const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");
const womenProducts = require("../data/womenProducts");

async function seedWomenProducts() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const operations = womenProducts.map((product) => ({
    updateOne: {
      filter: { name: product.name },
      update: { $set: product },
      upsert: true
    }
  }));

  const result = await Product.bulkWrite(operations);
  console.log(`Women products seeded. Inserted: ${result.upsertedCount}, updated: ${result.modifiedCount}`);

  await mongoose.disconnect();
}

seedWomenProducts().catch(async (error) => {
  console.error("Women product seed failed:", error.message);
  await mongoose.disconnect();
  process.exit(1);
});
