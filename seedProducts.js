const mongoose = require("mongoose");
const Product = require("./models/Product");

// 👇 هات الداتا من data.js
const PRODUCTS = require("./data"); // عدل المسار لو مختلف

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("Mongo connected"))
  .catch(err => console.log(err));

async function seed() {
  try {
    // 🧹 نمسح القديم (اختياري)
    await Product.deleteMany();

    // ✅ ندخل الجديد
    await Product.insertMany(PRODUCTS);

    console.log("Products inserted ✅");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();