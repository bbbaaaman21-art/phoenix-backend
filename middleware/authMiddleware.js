const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;



module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "غير مصرح" });
  }
 
  
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "توكن غير موجود" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // ✅ FIX

   req.user = {
  userId: decoded.userId, // 🔥 أهم سطر
  role: decoded.role
};

    next();
  } catch (err) {
    return res.status(401).json({ message: "توكن غير صالح" });
  }
};