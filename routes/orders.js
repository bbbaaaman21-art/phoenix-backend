const express = require("express");
const router = express.Router();
const addNotification = require("../utils/notifications");


const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const admin = require("../config/firebase");
const { savedToken } = require("./fcm");
/* ================================
   CREATE CASH ORDER (checkout)
================================ */

router.post("/", auth, async (req, res, next) => {
  try {
    console.log("🔥 BODY:", req.body);

    const { items, address, fullName, phone } = req.body;

    // ✅ تأكد إن فيه منتجات
    if (!items || !items.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ===============================
    // 🔥 تحسين الأداء (query واحدة بدل كتير)
    // ===============================
    const productIds = items.map(i => Number(i.productId));

    const products = await Product.find({
      id: { $in: productIds }
    }).lean();

    // ===============================
    // 🔥 حساب السعر من الباك
    // ===============================
    let total = 0;

    for (const item of items) {

  const product = products.find(
    p => p.id === Number(item.productId)
  );

  if (!product) {
    return res.status(400).json({ message: "Invalid product" });
  }

  // 🔥 منتج بالمتر
  if (product.hasMeters) {

    const materialFromDB = product.materials?.find(
      m => m.name === item.material?.name
    );

    if (!materialFromDB) {
      return res.status(400).json({ message: "Invalid material" });
    }

    total += Number(materialFromDB.price) * Number(item.meters);

  } else {
    // 🔥 منتج عادي (دي كانت ناقصة)
    total += Number(product.price) * Number(item.qty || 1);
  }
}
      
    

// ===============================
// 💰 حساب المنتجات
// ===============================
let subtotal = Number(total) || 0;

// ===============================
// 🚚 الشحن
// ===============================
let shipping = subtotal >= 10000 ? 0 : 200;

// ===============================
// 💵 الإجمالي النهائي
// ===============================
const finalTotal = subtotal + shipping;

// ===============================
// 🛠️ تجهيز العناصر (prices + materials)
// ===============================
const updatedItems = items.map(item => {

  const product = products.find(
    p => p.id === Number(item.productId)
  );

  if (!product) return item;

  // 🟢 منتج بالمتر
  if (product.hasMeters) {

    const materialFromDB = product.materials?.find(
      m => m.name === item.material?.name
    );

    if (!materialFromDB) return item;

    return {
      productId: item.productId,
      name: item.name,
      image: item.image,

      // ✅ المهم
      meters: item.meters,
      qty: undefined, // 👈 امنعها

      material: {
        name: item.material.name,
        price: materialFromDB.price
      },

      price: materialFromDB.price,
        color: item.color || null
    };

  }

  // 🟢 منتج عادي
  return {
    productId: item.productId,
    name: item.name,
    image: item.image,

    qty: item.qty,
    meters: undefined, // 👈 امنعها

    price: product.price,
      color: item.color || null
  };

});
// ===============================
// ✅ إنشاء الأوردر
// ===============================
const order = await Order.create({
  userId: req.user.userId,
  items: updatedItems,
  address,
  name: fullName,
  phone,
  subtotal,
  shipping,
  total: finalTotal,
  paymentStatus: "cash_pending"
});

// 🔥 تحديث المبيعات (parallel)
await Promise.all(
  items.map(item =>
    Product.updateOne(
      { id: Number(item.productId) },
      { $inc: { sold: item.qty || 1 } }
    )
  )
);

// 🔔 notification
addNotification(req.user.userId, "تم إنشاء الطلب بنجاح 🎉")
  .catch(err => console.error(err));

// 🔥 socket
const io = req.app.get("io");
io.emit("newOrder", order);

// 🔥 Firebase Push Notification
try {

  if (savedToken) {

    await admin.messaging().send({
      token: savedToken,

      notification: {
        title: "🛒 طلب جديد",
        body: `طلب جديد باسم ${fullName}`
      },

      webpush: {
        notification: {
          icon: "https://rovixhome.com/img/logo.png"
        }
      }
    });

    console.log("✅ PUSH SENT");

  } else {

    console.log("❌ NO FCM TOKEN");

  }

} catch (err) {

  console.log("❌ PUSH ERROR:", err);

}

res.json(order);

  } catch (err) {
    console.error("ORDER ERROR:", err);
    next(err); // 🔥 ربط مع global error handler
  }
});
//==================cancel=============
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔥 Debug مهم
    console.log("BEFORE:", order.status);

    if (order.status === "shipped" || order.status === "delivered") {
      return res.status(400).json({ message: "لا يمكن الإلغاء بعد الشحن" });
    }

    order.status = "cancelled_by_user";

    await order.save();

    console.log("AFTER:", order.status);

    // 🔥 socket
    const io = req.app.get("io");
    io.emit("orderUpdated", order);

    res.json(order);

  } catch (err) {
    console.error("CANCEL ERROR:", err);
    res.status(500).json({});
  }
});
//================== GET MY ORDERS =================
router.get("/my-orders", auth, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.error("MY ORDERS ERROR:", err);
    next(err);

  }
});
/* ================= GET SINGLE ORDER ================= */
router.get("/:id", auth, async (req, res, next) => {
try {
const order = await Order.findOne({
_id: req.params.id,
userId: req.user.userId
}).lean();

```
if (!order) {
  return res.status(404).json({ message: "Order not found" });
}

res.json(order);
```

} catch (err) {
next(err);
}
});
router.delete("/:id", auth, async (req, res, next) => {
  try {

    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (["shipped", "delivered"].includes(order.status)) {
      return res.status(400).json({
        message: "لا يمكن حذف الطلب بعد الشحن"
      });
    }

    await order.deleteOne();

    const io = req.app.get("io");

if (io) {
  io.emit("orderDeleted", order._id);
}
    res.json({ message: "Order deleted successfully" });

  } catch (err) {
    next(err);
  }
});
module.exports = router;