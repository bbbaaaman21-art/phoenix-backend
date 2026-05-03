const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "محاولات كتير، حاول بعد 15 دقيقة"
  }
});

const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const addNotification = require("../utils/notifications");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const JWT_SECRET = process.env.JWT_SECRET;


/* ================== FORGOT PASSWORD ================== */
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({
        message: "لو الإيميل مسجل، هيوصلك رابط إعادة التعيين"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 60 * 60 * 1000; // 60 دقيقة
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset.html?token=${token}`;

    await sendEmail(user.email, resetLink);

    res.json({
      message: "تم إرسال رابط إعادة تعيين كلمة المرور على الإيميل"
    });

  } catch (err) {
    console.error("FORGOT ERROR:", err);
    next(err);
  }

});

/* ================== RESET PASSWORD ================== */
router.post("/reset-password", async (req, res, next) => {
  try {
    console.log("RESET BODY:", req.body);

    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "بيانات غير كاملة" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "الرابط غير صالح أو انتهت صلاحيته"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    // 🔔 Notification (المكان الصح)
    await addNotification(
      user._id,
      "تم تغيير كلمة المرور بنجاح",
      "success"
    );

    res.json({ message: "تم تغيير كلمة المرور بنجاح" });

  } catch (err) {
    console.error("RESET ERROR:", err);
   next(err);
  }
});

/* ================== AUTH ================== */

/* ===== REGISTER ===== */

router.post(
  "/register",
  authLimiter,
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password ضعيف"),
    body("firstName").notEmpty().withMessage("First name required"),
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

      const { firstName, lastName, email, password } = req.body;

      const exists = await User.findOne({ email });
      if (exists) {
        return res.json({
          success: false,
          message: "الإيميل مستخدم بالفعل"
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      res.json({ success: true });

    } catch (err) {
      next(err);
    }
  }
);
/* ===== LOGIN ===== */

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password required"),
  ],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          message: "بيانات الدخول غير صحيحة"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({
          success: false,
          message: "بيانات الدخول غير صحيحة"
        });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role  
        }
      });

    } catch (err) {
      next(err);
    }
  }
);




module.exports = router;