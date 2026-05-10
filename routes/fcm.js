const express = require("express");
const router = express.Router();

const admin = require("../config/firebase");
const FcmToken = require("../models/FcmToken");

// ================= SAVE TOKEN =================
router.post("/save-fcm-token", async (req, res) => {

  try {

    const token = req.body.fcmToken;

    if (!token) {
      return res.status(400).json({
        success: false
      });
    }

    await FcmToken.findOneAndUpdate(
      { token },
      { token },
      { upsert: true, new: true }
    );

    console.log("FCM TOKEN SAVED:", token);

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false
    });

  }

});

// ================= TEST NOTIFICATION =================
router.get("/test-notification", async (req, res) => {

  try {

    const tokens = await FcmToken.find();

    for (const t of tokens) {

      await admin.messaging().send({
        token: t.token,

        notification: {
          title: "🛒 Test Notification",
          body: "Firebase Push شغال 🔥"
        },

        webpush: {
          notification: {
            icon: "https://rovixhome.com/img/logo.png"
          }
        }
      });

    }

    res.json({
      success: true
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;