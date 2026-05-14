const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// مهم 👇
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 🔥 إنشاء uploads لو مش موجود
const uploadsPath = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

//==========avatar====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.user.userId + "-" + Date.now() + ext);
  }
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
//=================profile===================
router.put("/profile", auth, async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;

    await user.save();

    res.json({
      success: true,
      user
    });

  } catch (err) {
    next(err);
  }
});
//==================pass
router.put(
  "/change-password",
  auth,
  [
    body("oldPass").notEmpty().withMessage("Old password required"),
    body("newPass")
      .isLength({ min: 6 })
      .withMessage("Password لازم 6 حروف على الأقل"),
  ],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        });
      }

      const { oldPass, newPass } = req.body;

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const isMatch = await bcrypt.compare(oldPass, user.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "كلمة المرور القديمة غير صحيحة"
        });
      }

      // 🔐 تحديث كلمة المرور
      user.password = await bcrypt.hash(newPass, 10);

      await user.save();

      res.json({
        success: true,
        message: "تم تغيير كلمة المرور بنجاح"
      });

    } catch (err) {
      next(err);
    }
  }
);
//=====================ava==================
router.put(
  "/avatar",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const user = await User.findById(req.user.userId);

      user.avatar = req.file.filename;
      await user.save();

      res.json({
        success: true,
        avatar: user.avatar
      });

    } catch (err) {
      next(err);
    }
  }
);
//========================del ava==================
router.delete("/avatar", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    const oldAvatar = user.avatar;

    if (oldAvatar && oldAvatar !== "default-avatar.png") {
      const filePath = path.join(__dirname, "..", "uploads", oldAvatar);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    user.avatar = "default-avatar.png";
    await user.save();

    res.json({
      success: true,
      avatar: user.avatar
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;