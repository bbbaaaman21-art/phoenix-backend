const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 🆔 id اللي انت شغال بيه في الفرونت
    id: {
      type: Number,
      required: true,
      unique: true
    },

    // 📌 الاسم
    name: {
      type: String,
      required: true,
      trim: true
    },

    // 🏷️ الفئة
    category: {
      type: String,
      default: "general"
    },

    // 💰 السعر الحالي
    price: {
      type: Number,
      required: true
    },

    // 💸 السعر قبل الخصم
    oldPrice: {
      type: Number,
      default: 0
    },

    // ⭐ التقييم
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },

    // 🔥 badges
    badge: {
      type: String,
      default: ""
    },

    badge2: {
      type: String,
      default: ""
    },

    // 📦 الأكثر مبيعاً
    bestSeller: {
      type: Boolean,
      default: false
    },

    // 📈 عدد المبيعات
    sold: {
      type: Number,
      default: 0
    },

    // 📝 الوصف
    description: {
      type: String,
      default: ""
    },

    // 📏 المقاسات
    dimensions: {
      type: String,
      default: ""
    },

    // 🖼️ الصورة الأساسية
    image: {
      type: String,
      default: null
    },

    // 🖼️ نسخة webp
    imageWebp: {
      type: String,
      default: null
    },

    // 🖼️ صور إضافية
    images: {
      type: [String],
      default: []
    },

    // 🎨 الألوان (يدعم لون أو أكثر)
    colors: [
      {
        name: {
          type: String,
          default: ""
        },
        codes: {
          type: mongoose.Schema.Types.Mixed, // 🔥 مهم عشان يدعم string أو array
          default: []
        }
      }
    ],

    // 🪵 الخامات (للمتر)
    materials: [
      {
        name: String,
        price: Number
      }
    ],

    // 📏 هل المنتج بالمتر؟
    hasMeters: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

// ================= VALIDATION =================
productSchema.pre("save", async function () {
  if (!this.id) {
    this.id = Date.now();
  }

  if (this.hasMeters && (!this.materials || !this.materials.length)) {
    throw new Error("Products with meters must have materials");
  }

  if (!this.hasMeters) {
    this.materials = [];
  }
});

  productSchema.index({ name: 1 });
productSchema.index({ category: 1 });

module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);