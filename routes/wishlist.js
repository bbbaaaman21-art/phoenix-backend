const express = require("express");
const router = express.Router();

const Wishlist = require("../models/wishlist");
const auth = require("../middleware/authMiddleware");

// ================================
// GET wishlist
// ================================
router.get("/", auth, async (req, res) => {
  try {
    const list = await Wishlist.findOne({ user: req.user.userId });

    if (!list) return res.json([]);

    res.json(list.products.map(id => id.toString()));
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// ================================
// ADD product
// ================================
router.post("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: req.user.userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.userId,
        products: [productId]
      });
    } else if (
      !wishlist.products.map(id => id.toString()).includes(productId)
    ) {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    res.json(wishlist.products.map(id => id.toString()));
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

// ================================
// REMOVE product
// ================================
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user.userId });

    if (!wishlist) return res.json([]);

    wishlist.products = wishlist.products.filter(
      id => id.toString() !== productId
    );

    await wishlist.save();

    res.json(wishlist.products.map(id => id.toString()));
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

module.exports = router;
