require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const auth = require("./middleware/authMiddleware");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");
const Wishlist = require("./models/wishlist");
const wishlistRoutes = require("./routes/wishlist");
const notificationsRoutes = require("./routes/notifications");
console.log("NOTIFICATIONS TYPE:", typeof notificationsRoutes);
const authRoutes = require("./routes/auth");
const path = require("path");
const fs = require("fs");
const Order = require("./models/Order");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const addressRoutes = require("./routes/addresses");
const userRoutes = require("./routes/user");
const Cart = require("./models/Cart");
const crypto = require("crypto");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const axios = require("axios");
const sendEmail = require("./utils/sendEmail");

const app = express();

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message: "طلبات كتير جدًا، حاول بعد شوية"
  }
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // login attempts قليلة
  message: {
    message: "محاولات كتير، حاول بعد 15 دقيقة"
  }
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

// ========== File Upload (avatars) ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.user.userId + "-" + Date.now() + ext);
  }
});

function fileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
}


const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },// 2MB
});

/* ================== MIDDLEWARE ================== */

app.disable("x-powered-by");

app.use(cors({
  origin: ["https://rovixhome.com", "https://rovixhome.com"], // فرونت عندك
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "'unsafe-inline'"
        ],

        scriptSrcAttr: ["'unsafe-inline'"], // 👈 الحل هنا

        styleSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
          "https://www.gstatic.com",
          "'unsafe-inline'"
        ],

        imgSrc: [
          "'self'",
          "data:",
          "https:"
        ],

        connectSrc: [
          "'self'",
          "https://cdn.jsdelivr.net"
        ],

        fontSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com",
          "data:"
        ]
      }
    }
  })
);
app.use(compression());
app.use(express.json());

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss");

//app.use(mongoSanitize());


app.use((req, res, next) => {
  if (req.body) {
    for (let key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// 🔥 حماية كل API
app.use("/api", limiter);
// ================= ROUTES =================
app.use(morgan("dev"));
app.use("/api/products", productRoutes);
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/cart", cartRoutes);
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/addresses", addressRoutes);
// ================= STATIC =================
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));


/* ================== MONGODB ================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

/* ================== PAYMOB ================== */

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const INTEGRATION_ID = process.env.INTEGRATION_ID;
const IFRAME_ID = process.env.IFRAME_ID;
const PAYMOB_HMAC_SECRET = process.env.PAYMOB_HMAC_SECRET;


app.get("/api/orders/:id/invoice", async (req, res) => {

  try {

    const token = req.query.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🔥 verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const order = await Order.findOne({
      $or: [
        { _id: req.params.id, userId: decoded.userId },
        { merchantOrderId: req.params.id, userId: decoded.userId }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // باقي كود الفاتورة...

    const templatePath = path.join(__dirname, "invoice/invoice.template.html");
    let html = fs.readFileSync(templatePath, "utf8");

    /* ================= IMAGES ================= */

    const toBase64 = (filePath) => {
      try {
        const ext = path.extname(filePath).substring(1);
        const file = fs.readFileSync(filePath);
        return `data:image/${ext};base64,${file.toString("base64")}`;
      } catch {
        return "";
      }
    };

    html = html.replace(/{{LOGO}}/g, toBase64(path.join(__dirname, "invoice/assets/logo.png")));
    html = html.replace(/{{PHONE_ICON}}/g, toBase64(path.join(__dirname, "invoice/assets/phone.png")));
    html = html.replace(/{{WHATSAPP_ICON}}/g, toBase64(path.join(__dirname, "invoice/assets/whatsapp.png")));
    html = html.replace(/{{STAMP}}/g, toBase64(path.join(__dirname, "invoice/assets/stamp.png")));

    /* ================= ITEMS + SUBTOTAL ================= */

    let itemsHTML = "";
    let subtotal = 0;

    (order.items || []).forEach(item => {

      let details = [];

      if (item.material?.name) {
        details.push(`الخامة: ${item.material.name}`);
      }

      if (item.material?.name && item.meters) {
        details.push(`عدد الأمتار: ${item.meters}`);
      }

      if (item.color?.name) {
        details.push(`اللون: ${item.color.name}`);
      }

      // 🔥 حساب السعر
      let unitPrice = 0;

      if (item.material?.price && item.meters) {
        unitPrice = Number(item.material.price) * Number(item.meters);
      } else {
        unitPrice = Number(item.price) || 0;
      }

      const qty = item.qty || 1;
      const totalPrice = unitPrice * qty;

      subtotal += totalPrice;

      itemsHTML += `
        <tr>
          <td>${item.name || "منتج"}</td>
          <td>${details.join(" | ") || "-"}</td>
          <td>${qty}</td>
          <td>${unitPrice.toFixed(2)}</td>
          <td>${totalPrice.toFixed(2)}</td>
        </tr>
      `;
    });

    /* ================= SHIPPING ================= */

    let shipping = subtotal >= 10000 ? 0 : 200;

    /* ================= TOTAL ================= */

    const finalTotal = subtotal + shipping;

    /* ================= DATA ================= */

    const data = {
      NAME: order.name || "-",
      PHONE: order.phone || "-",
      ADDRESS: order.address?.city || "-",
      ORDER_ID: order.merchantOrderId || order._id,
      DATE: new Date(order.createdAt).toLocaleDateString("en-GB"),
      SHIPPING: shipping.toFixed(2),
      TOTAL: finalTotal.toFixed(2),
      ITEMS: itemsHTML
    };

    Object.keys(data).forEach(key => {
      html = html.replace(new RegExp(`{{${key}}}`, "g"), data[key]);
    });

    /* ================= RESPONSE ================= */

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);

  } catch (err) {
    console.error("INVOICE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});
/* ================== PAY ROUTE ================== */

/* ================== HEALTH ================== */
app.get("/", (req, res, next) => {
  res.send("Phoenix Backend is running 🚀");
});
/* ================== START ================== */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
});

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://rovixhome.com", "https://rovixhome.com"]
  }
});
// 🔥 نخزن io عشان نستخدمه في أي مكان
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔥 Admin connected:", socket.id);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});