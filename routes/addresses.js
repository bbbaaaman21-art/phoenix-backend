const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const addNotification = require("../utils/notifications");
//===================addressses=============
router.get("/", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.addresses);
  } catch (err) {
    next(err);
  }
});
//====================
router.put("/:id/default", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    user.addresses.forEach(addr => addr.isDefault = false);

    const address = user.addresses.id(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.isDefault = true;
    await user.save();

    res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    next(err);
  }
});
//=================
router.put("/:id/default", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔄 إلغاء أي عنوان افتراضي قديم
    user.addresses.forEach(addr => {
      addr.isDefault = false;
    });

    // 📍 تعيين العنوان الجديد
    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    address.isDefault = true;

    await user.save();

    res.json({
      success: true,
      addresses: user.addresses
    });

  } catch (err) {
    next(err);
  }
});
//========================
router.post(
  "/",
  auth,
  [
    body("label").notEmpty().withMessage("Label required"),
    body("city").notEmpty().withMessage("City required"),
    body("street").notEmpty().withMessage("Street required"),
  ],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation Error",
          errors: errors.array()
        });
      }

      const { label, city, street, details } = req.body;

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // ➕ إضافة العنوان
      user.addresses.push({ label, city, street, details });

      await user.save();

      // 🔔 Notification
      await addNotification(
        req.user.userId, // 👈 تعديل مهم
        "تم إضافة عنوان جديد بنجاح",
        "success"
      );

      res.json({
        success: true,
        addresses: user.addresses
      });

    } catch (err) {
      next(err);
    }
  }
);
//====================
router.put(
  "/:id",
  auth,
  [
    body("label").optional().notEmpty().withMessage("Label cannot be empty"),
    body("city").optional().notEmpty().withMessage("City cannot be empty"),
    body("street").optional().notEmpty().withMessage("Street cannot be empty"),
  ],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Validation Error",
          errors: errors.array()
        });
      }

      const { label, city, street, details } = req.body;

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const address = user.addresses.id(req.params.id);

      if (!address) {
        return res.status(404).json({ message: "Address not found" });
      }

      // ✏️ تحديث القيم فقط لو موجودة
      address.label = label ?? address.label;
      address.city = city ?? address.city;
      address.street = street ?? address.street;
      address.details = details ?? address.details;

      await user.save();

      // 🔔 Notification (fix مهم)
      await addNotification(
        req.user.userId,
        "تم تعديل العنوان بنجاح",
        "info"
      );

      res.json({
        success: true,
        addresses: user.addresses
      });

    } catch (err) {
      next(err);
    }
  }
);
//=================
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const address = user.addresses.id(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // 🗑️ حذف العنوان
    user.addresses.pull(req.params.id);

    await user.save();

    // 🔔 Notification (fix مهم)
    await addNotification(
      req.user.userId,
      "تم حذف العنوان",
      "error"
    );

    res.json({
      success: true,
      addresses: user.addresses
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;