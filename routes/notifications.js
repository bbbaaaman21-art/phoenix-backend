const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// ================= GET ALL NOTIFICATIONS =================
router.get("/", auth, async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.userId).select("notifications");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!Array.isArray(user.notifications)) {
      return res.json([]);
    }

    res.json(user.notifications);

  } catch (err) {
    console.error("NOTIFICATIONS ERROR:", err); // 👈 مهم جدًا
    next(err);
  }
});

// ================= DELETE ONE =================
router.delete("/:id", auth, async (req, res, next) => {
  try {
    const mongoose = require("mongoose");

    const notifId = new mongoose.Types.ObjectId(req.params.id);

    const result = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $pull: {
          notifications: { _id: notifId }
        }
      }
    );

    res.json({ message: "Notification deleted" });

  } catch (err) {
    console.error("REAL ERROR:", err);
    return res.status(500).json({ error: err.message }); // ❗ بدل next
  }
});




// ================= DELETE ALL =================
router.delete("/", auth, async (req, res, next) => {
try {
const user = await User.findById(req.user.userId);

```
if (!user) {
  return res.status(404).json({ message: "User not found" });
}

user.notifications = [];

await user.save();

res.json({ message: "All notifications cleared" });
```

} catch (err) {
next(err);
}
});
//=============================
router.put("/:id/read", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const notif = user.notifications.id(req.params.id);

    if (!notif) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notif.isRead = true;

    await user.save();

    res.json({ message: "Marked as read" });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
