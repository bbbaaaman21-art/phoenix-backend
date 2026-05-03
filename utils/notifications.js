const User = require("../models/User");

async function addNotification(userId, message, type = "info") {
try {
await User.findByIdAndUpdate(userId, {
$push: {
notifications: { message, type }
}
});
} catch (err) {
console.error("Add Notification Error:", err.message);
}
}

module.exports = addNotification;
