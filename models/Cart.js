const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: Number,

  name: String,     // 🔥 مهم
  image: String,    // 🔥 مهم

  price: Number,    // 🔥 أهم سطر (unit price)

  qty: {
    type: Number,
    default: 1
  },

  color: {
    name: String,
    codes: [String]
  },

  meters: Number,

  material: {
    name: String,
    price: Number
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },
  items: [cartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);