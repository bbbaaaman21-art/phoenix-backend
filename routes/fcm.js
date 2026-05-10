// firebase notification route
const express = require("express");
const router = express.Router();

let savedToken = null;

module.exports.savedToken = savedToken;

router.post("/save-fcm-token", (req, res) => {

savedToken = req.body.fcmToken;

module.exports.savedToken = savedToken;

  console.log("FCM TOKEN SAVED:", savedToken);

  res.json({
    success: true
  });

});

router.get("/test-notification", async (req, res) => {

  try {

    const admin = require("../config/firebase");

    await admin.messaging().send({
      token: savedToken,

      notification: {
        title: "🛒 طلب جديد",
        body: "تم استلام أوردر جديد"
      }
    });

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