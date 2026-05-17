const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

//==========avatar====================

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "rovix-users",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp"
    ],

    transformation: [
      {
        width: 500,
        height: 500,
        crop: "limit"
      }
    ]
  }
});

function fileFilter(req, file, cb) {

  const allowed = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
}

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

//=================profile===================

router.put("/profile", auth, async (req, res, next) => {

  try {

    const { firstName, lastName, email } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
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

//==================pass==================

router.put(
  "/change-password",
  auth,
  [
    body("oldPass")
      .notEmpty()
      .withMessage("Old password required"),

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

      const isMatch = await bcrypt.compare(
        oldPass,
        user.password
      );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "كلمة المرور القديمة غير صحيحة"
        });
      }

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

//=====================avatar==================

router.put(
  "/avatar",
  auth,
  upload.single("avatar"),

  async (req, res, next) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          message: "No image uploaded"
        });
      }

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      // 🔥 حفظ الصورة الجديدة
      user.avatar = req.file.path;

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

//========================delete avatar==================
router.delete(
  "/avatar",
  auth,

  async (req, res, next) => {

    try {

      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const oldAvatar = user.avatar;

      user.avatar = "default-avatar.png";

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

module.exports = router;