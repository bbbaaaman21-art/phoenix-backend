const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const multer = require("multer");
const User = require("../models/User");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

/* ================= STORAGE ================= */

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => {

    const isWebp = file.fieldname === "imageWebp";

    return {
      folder: "rovix-products",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp"
      ],

      transformation: [
        isWebp
          ? {
              width: 1200,
              crop: "limit"
            }
          : {
              width: 600,
              crop: "limit"
            }
      ]
    };
  }
});

const upload = multer({ storage });

/* ================= PRODUCTS ================= */

// ✅ GET ALL PRODUCTS
router.get("/products", auth, isAdmin, async (req, res) => {
  try {
    const products = await Product.find().lean().lean().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json([]);
  }
});

router.post(
  "/products",
  auth,
  isAdmin,
 upload.fields([
  { name: "image", maxCount: 1 },       // الكرت
  { name: "imageWebp", maxCount: 1 }    // صفحة المنتج
]),
  async (req, res) => {
    try {
      const {
        name,
        price,
        oldPrice,
        rating,
        category,
        description,
        dimensions,
        hasMeters,
        bestSeller,
        colors,
        materials // 🔥 ضيفناها هنا
      } = req.body;

      if (!name || !price) {
        return res.status(400).json({ message: "Name & price required" });
      }

      const product = new Product({
        id: Date.now(),

        name,
        price,
        oldPrice: oldPrice || 0,
        rating: rating || 5,
        category: category || "general",
        description: description || "",
        dimensions: dimensions || "",

        // 🔥 مهم
        hasMeters: hasMeters === "true",

        bestSeller: bestSeller === "true",

        // 🔥 الصورة
        image: req.files?.image
        ?
req.files.image[0].path
        : null,

       imageWebp: req.files?.imageWebp
       ? 
req.files.imageWebp[0].path
       : null,

        // 🔥 الألوان
        colors: colors
          ? JSON.parse(colors).map(c => ({
              name: c.name,
              codes: Array.isArray(c.codes) ? c.codes : [c.codes]
            }))
          : [],

        // 🔥 الخامات (أهم تعديل)
        materials: materials
          ? JSON.parse(materials)
          : []
      });

      await product.save();

      res.json(product);

    } catch (err) {
      console.error("ADD PRODUCT ERROR:", err);
      res.status(500).json({ message: "Error creating product" });
    }
  }
);
// ✅ DELETE PRODUCT
router.delete("/products/:id", auth, isAdmin, async (req, res) => {
  try {

    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 أهم سطر: شيل المنتج من كل wishlists
    await Wishlist.updateMany(
      {},
      { $pull: { products: id } }
    );

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Error deleting product" });
  }
});

/* ================= ORDERS ================= */

// ✅ GET ALL ORDERS
router.get("/orders", auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email firstName")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json([]);
  }
});

// ✅ UPDATE ORDER STATUS
router.put("/orders/:id", auth, isAdmin, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const updateData = {};

    if (status) updateData.status = status;
    if (trackingNumber !== undefined) updateData.trackingNumber = trackingNumber;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("UPDATE ORDER ERROR:", err);
    res.status(500).json({});
  }
});

/* ================= STATS ================= */

router.get("/stats", auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((sum, o) => {
      return sum + (o.total || 0);
    }, 0);

    const pendingOrders = orders.filter(
      (o) => o.status === "pending"
    ).length;

    res.json({
      totalOrders,
      totalRevenue,
      pendingOrders
    });
  } catch (err) {
    console.error("STATS ERROR:", err);
    res.status(500).json({});
  }
});

/* ================= TOP PRODUCTS ================= */

router.get("/top-products", auth, isAdmin, async (req, res) => {
  try {
    const products = await Product.find().lean()
      .sort({ sold: -1 })
      .limit(5);

    res.json(products);
  } catch (err) {
    console.error("TOP PRODUCTS ERROR:", err);
    res.status(500).json([]);
  }
});
//=============get user====================
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});
//===================delete user===============
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  try {

    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ ممنوع حذف السوبر أدمن
    if (targetUser.role === "super_admin") {
      return res.status(403).json({ message: "لا يمكن حذف الأدمن الأساسي" });
    }

        if (req.user.role !== "super_admin") {
      return res.status(403).json({ message: "صلاحية غير كافية" });
    }
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted" });

  } catch (err) {
    res.status(500).json({});
  }
});
//===================make admin================
router.put("/users/:id", auth, isAdmin, async (req, res) => {
  try {
    const currentUser = req.user; // اللي عامل الطلب
    const targetUser = await User.findById(req.params.id);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // ❌ ممنوع تعديل super_admin
    if (targetUser.role === "super_admin") {
      return res.status(403).json({ message: "لا يمكن تعديل الأدمن الأساسي" });
    }

    // ❌ بس السوبر أدمن هو اللي يقدر يغير roles
    if (currentUser.role !== "super_admin") {
      return res.status(403).json({ message: "صلاحية غير كافية" });
    }

    // 👑 تحويل المستخدم إلى admin
    targetUser.role = "admin";
    await targetUser.save();

    res.json(targetUser);

  } catch (err) {
    res.status(500).json({});
  }
});
//====================================

// ✅ UPDATE PRODUCT (ADMIN)
router.put(
  "/products/:id",
  auth,
  isAdmin,
  upload.fields([
  { name: "image", maxCount: 1 },
  { name: "imageWebp", maxCount: 1 }
]),
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const {
        name,
        price,
        oldPrice,
        rating,
        category,
        description,
        dimensions,
        hasMeters,
        bestSeller,
        colors,
        materials
      } = req.body;

      // ================= UPDATE =================
      if (name) product.name = name;
      if (price) product.price = price;
      if (oldPrice !== undefined) product.oldPrice = oldPrice;
      if (rating) product.rating = rating;
      if (category) product.category = category;
      if (description) product.description = description;
      if (dimensions) product.dimensions = dimensions;

      product.hasMeters = hasMeters === "true";
      product.bestSeller = bestSeller === "true";

      // 🖼️ صورة جديدة
      // 🖼️ صورة الكرت
if (req.files?.image) {
product.image = req.files.image[0].path;
}

// 🖼️ صورة صفحة المنتج
if (req.files?.imageWebp) {
product.imageWebp = req.files.imageWebp[0].path;
}

      // 🎨 colors
      if (colors) {
        product.colors = JSON.parse(colors);
      }

      // 🪵 materials
      if (materials) {
        product.materials = JSON.parse(materials);
      }

      await product.save();

      res.json(product);

    } catch (err) {
      console.error("UPDATE PRODUCT ERROR:", err);
      res.status(500).json({ message: "Error updating product" });
    }
  }
);


module.exports = router;