const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// ================= PRICE CALCULATOR =================
// ================= PRICE CALCULATOR =================
function calculatePrice(product, { material, meters = 1, qty = 1 }) {

  // 🔥 منتجات بالمتر
  if (product.hasMeters) {

    if (!material?.name) {
      throw new Error("Material is required");
    }

    const materialFromDB = product.materials.find(
      m => m.name === material.name
    );

    if (!materialFromDB) {
      throw new Error("Invalid material");
    }

    const unitPrice = materialFromDB.price;

    return {
      unitPrice,
      total: unitPrice * meters
    };
  }

  // 🔥 منتجات عادية
  return {
    unitPrice: product.price,
    total: product.price * (qty || 1)
  };
}


// ================= GET CART =================
router.get("/", auth, async (req, res) => {
  try {

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.userId,
        items: []
      });
    }

    res.json(cart.items);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= ADD =================
router.post("/add", auth, async (req, res) => {
  try {

    const { productId, qty, color, meters, material } = req.body;

    // 🔥 مهم: تأكد إنه رقم
    const product = await Product.findOne({ id: Number(productId) });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
      cart = new Cart({
        user: req.user.userId,
        items: []
      });
    }

    // 🔥 حساب السعر
    const result = calculatePrice(product, {
      material,
      meters,
      qty
    });

    const uniqueId = `${productId}-${meters}-${material?.name}-${JSON.stringify(color?.codes)}`;

    const existing = cart.items.find(item =>
      item.id === uniqueId
    );

    if (existing) {
      existing.qty += qty || 1;
    } else {

      cart.items.push({
        id: uniqueId,
        productId,
        name: product.name,
        image: product.image,

        // 🔥 السعر من السيرفر
        price: result.unitPrice,

        qty: qty || 1,
        meters,
        material,
        color
      });
    }

    await cart.save();

    res.json(cart.items);

  } catch (err) {
    console.error("ADD ERROR:", err.message);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// ================= REMOVE =================
// ================= REMOVE =================
router.post("/remove", auth, async (req, res) => {
  try {

    if (!req.body || !req.body.cartItemId) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const { cartItemId } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) return res.json([]);

    // 🔥 حذف item واحد فقط
    cart.items = cart.items.filter(
      item => String(item._id) !== String(cartItemId)
    );

    await cart.save();

    res.json(cart.items);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// ================= CLEAR =================
router.post("/clear", auth, async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) return res.json([]);

    cart.items = [];
    await cart.save();

    res.json([]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;