const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

   items: [
  {
    productId: Number,
    name: String,
    price: Number,
    qty: { type: Number, default: null },

    color: {
      codes: mongoose.Schema.Types.Mixed,
      name: String
    },

    // 🔥 ضيف دول
    meters: { type: Number, default: null },
    material: {
  name: String,
  price: Number,
  subtotal: Number, 
  shipping: Number
 },

    image: String
  }

    ],

    address: {
      label: String,
      city: String,
      street: String,
      details: String
    },

    name: String,
    email: String,
    phone: String,

    total: Number,

    merchantOrderId: String,
    paymobOrderId: Number,
    transactionId: Number,
     

    status: {
  type: String,
  default: "pending"
},

trackingNumber: {
  type: String,
  default: ""
},

    paymentStatus: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1 });
orderSchema.index({ merchantOrderId: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
