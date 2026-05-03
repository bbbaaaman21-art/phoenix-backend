const express = require("express");
const router = express.Router();

const Product = require("../models/Product");


// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean().sort({ createdAt: -1 });
    res.json(products);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= BEST SELLERS =================
router.get("/best-sellers", async (req, res) => {
  try {
    const products = await Product.find().lean()
      .sort({ sold: -1, createdAt: -1 })
      .limit(10);

    res.json(products);

  } catch (err) {
    console.error("BEST SELLERS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= GET PRODUCT BY ID =================
router.get("/:id", async (req, res) => {
  try {
    const param = req.params.id;

    let product;

    // 🔥 لو رقم (id العادي)
    if (!isNaN(param)) {
      product = await Product.findOne({ id: Number(param) });
    } 
    // 🔥 لو Mongo ID
    else {
      product = await Product.findById(param);
    }

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= ADD PRODUCT =================



// ================= UPDATE PRODUCT =================
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);

    await product.save();

    res.json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= DELETE PRODUCT =================
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      id: Number(req.params.id)
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;