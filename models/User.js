const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  
  {
    firstName: String,
    lastName: String,

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    // 🔐 ROLE (NEW - مهم للأدمن)
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user"
    },

    // 🔐 reset password
    resetToken: String,
    resetTokenExpire: Date,

    // 📍 العناوين
    addresses: [
      {
        label: String,
        city: String,
        street: String,
        details: String,
        isDefault: {
          type: Boolean,
          default: false
        }
      }
    ],

    // 🖼 avatar
    avatar: {
      type: String,
      default: "default-avatar.png"
    },

    // 🔔 notifications
    notifications: [
{
_id: {
type: mongoose.Schema.Types.ObjectId,
auto: true
},
message: String,
type: {
type: String,
enum: ["success", "error", "info"],
default: "info"
},
isRead: {
type: Boolean,
default: false
},
createdAt: {
type: Date,
default: Date.now
}
}
]

  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);