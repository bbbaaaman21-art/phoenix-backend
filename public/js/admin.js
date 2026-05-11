// ================= INIT =================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getMessaging,
  getToken,
  onMessage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const socket = io("https://rovixhome.com");


let lastOrdersCount = 0;
let allOrders = [];

const token = localStorage.getItem("token");

// ❌ مفيش توكن
if (!token) {
  window.location.href = "/admin-login.html";
}

// 🔥 نحط try هنا
let payload;

try {
  payload = JSON.parse(atob(token.split('.')[1]));
} catch (err) {
  // ❌ توكن بايظ
  localStorage.removeItem("token");
  window.location.href = "/admin-login.html";
}

// ✅ نستخدمه بعد ما نتأكد
const isSuperAdmin = payload.role === "super_admin";

// ❌ مش admin ولا super_admin
if (payload.role !== "admin" && payload.role !== "super_admin") {
  window.location.href = "/";
}


const firebaseConfig = {
  apiKey: "AIzaSyBSxxZOEAn5kyj5xRZpkX3i8Pcvj7YQV2A",
  authDomain: "rovix-home.firebaseapp.com",
  projectId: "rovix-home",
  storageBucket: "rovix-home.firebasestorage.app",
  messagingSenderId: "443037415645",
  appId: "1:443037415645:web:2ec4434c6f4ec05f464334"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

document.addEventListener("DOMContentLoaded", () => {

  // طلب صلاحية الإشعارات
  if ("Notification" in window) {

   Notification.requestPermission()
.then(async (permission) => {

  console.log("Notification Permission:", permission);

  if (permission === "granted") {

    try {

      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      console.log("SW REGISTERED", registration);

      await navigator.serviceWorker.ready;

      const currentToken = await getToken(messaging, {
        vapidKey: "BFvRQ-ZYq9CZIRNeojUaoMr4HMq8-R-nZZcbFl_3yY7-IP-Q6HNGzocOy1u-Qh6HW8uJygTB8fcBewqhNBqXa9M",
        serviceWorkerRegistration: registration
      });

      if (currentToken) {

        console.log("FCM TOKEN:", currentToken);

fetch("https://rovixhome.com/api/save-fcm-token", {          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          body: JSON.stringify({
            fcmToken: currentToken
          })
        })
        .then(res => res.json())
        .then(data => {

          console.log("TOKEN SAVED RESPONSE:", data);

        })
        .catch(err => {

          console.log("SAVE TOKEN ERROR:", err);

        });

      } else {

        console.log("No registration token available");

      }

    } catch (err) {

      console.log("TOKEN ERROR:", err);

    }

  }

});

  }

  loadStats();
  loadOrders();
  loadTopProducts();

});

// استقبال أوردر جديد
socket.on("newOrder", (order) => {

  showToast("🔥 New Order !", "add");

  // 🔊 الصوت
  try {

    const audio = new Audio("/sounds/notify.mp3");

    audio.play().catch(() => {
      console.log("Sound blocked");
    });

  } catch (err) {
    console.log(err);
  }

  // 📱 إشعار داخل الصفحة
  if (Notification.permission === "granted") {

    new Notification("🛒 طلب جديد", {
      body: "تم استلام أوردر جديد",
      icon: "https://rovixhome.com/img/logo/64.png",
      requireInteraction: true
    });

  }

  // تحديث الطلبات
  loadOrders();

});
// ================= STATS =================
async function loadStats() {
  try {
    const res = await fetch(`${API}/admin/stats`, {
      headers: { Authorization: "Bearer " + token }
    });

    const data = await res.json();

    document.getElementById("stats").innerHTML = `
      <div class="stats-grid">

        <div class="card dark">
          <h3>📦 الطلبات</h3>
          <h2>${data.totalOrders}</h2>
        </div>

        <div class="card green">
          <h3>💰 الأرباح</h3>
          <h2>${data.totalRevenue} EGP</h2>
        </div>

        <div class="card orange">
          <h3>🟡 Pending</h3>
          <h2>${data.pendingOrders}</h2>
        </div>

      </div>
    `;
  } catch (err) {
    console.error("STATS ERROR:", err);
  }
}

// ================= PRODUCTS =================
async function loadProducts() {
  const res = await fetch(`${API}/admin/products`, {
    headers: { Authorization: "Bearer " + token }
  });

  const products = await res.json();

  document.getElementById("content").innerHTML =
    products.map(p => `
      <div class="card product-card">
        <h3>${p.name}</h3>
        <p>السعر: ${p.price}</p>

        <div class="actions">
         <button onclick="editProduct('${p._id}')" class="btn">✏️ تعديل</button>
<button onclick="deleteProduct('${p._id}')" class="btn danger">🗑 حذف</button>
        </div>
      </div>
    `).join("");
}

// ================= DELETE =================
async function deleteProduct(id) {
  await fetch(`${API}/admin/products/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  localStorage.removeItem("allProducts");
  localStorage.removeItem("allProducts_time");

  loadProducts();
}

// ================= ADD PRODUCT =================
async function addProduct() {

const materials = [];

document.querySelectorAll("#materialsContainer div").forEach(div => {
  const inputs = div.querySelectorAll("input");

  materials.push({
    name: inputs[0].value.trim(),
    price: Number(inputs[1].value)
  });
});

  const formData = new FormData();

  // ================= BASIC =================
  formData.append("name", document.getElementById("name").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("oldPrice", document.getElementById("oldPrice").value);
  formData.append("rating", document.getElementById("rating").value);
  formData.append("category", document.getElementById("category").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("dimensions", document.getElementById("dimensions").value);

  // ================= FLAGS =================
  formData.append("hasMeters", document.getElementById("hasMeters").checked);
  formData.append("materials", JSON.stringify(materials));
  formData.append("bestSeller", document.getElementById("bestSeller").checked);

  // ================= IMAGE =================
  const image = document.getElementById("image").files[0];
const imageWebp = document.getElementById("imageWebp").files[0];

if (image) {
  formData.append("image", image);
}

if (imageWebp) {
  formData.append("imageWebp", imageWebp);
}
  // ================= COLORS =================
  const colors = [];
  document.querySelectorAll("#colorsContainer div").forEach(div => {
    const inputs = div.querySelectorAll("input");

    let codes = inputs[1].value.trim();

    if (codes.includes(",")) {
      codes = codes.split(",").map(c => c.trim());
    }

    colors.push({
      name: inputs[0].value.trim(),
      codes: codes
    });
  });

  formData.append("colors", JSON.stringify(colors));

  

  // ================= SEND =================
 // ================= SEND =================
const isEditing = editingId !== null;

const url = isEditing
  ? `${API}/admin/products/${editingId}`
  : `${API}/admin/products`;

const method = isEditing ? "PUT" : "POST";

console.log("editingId:", editingId);
console.log("method:", method);

await fetch(url, {
  method,
  headers: {
    Authorization: "Bearer " + token
  },
  body: formData
});
localStorage.removeItem("allProducts");
localStorage.removeItem("allProducts_time");

alert(editingId ? "تم تعديل المنتج ✅" : "تم إضافة المنتج ✅");

editingId = null;

loadProducts();
}

// ================= ORDERS =================
async function loadOrders() {
  const res = await fetch(`${API}/admin/orders`, {
    headers: { Authorization: "Bearer " + token }
  });

  const orders = await res.json();

  // 🔔 إشعار أوردر جديد
if (orders.length > lastOrdersCount && lastOrdersCount !== 0) {
  showToast("🔥 New Order From ", "add" + (orders[0]?.userId?.email || "عميل"));

  try {
    const audio = new Audio("/sounds/notify.mp3");
    audio.play().catch(() => {
      // 🔇 لو المتصفح منع الصوت
      console.log("Sound blocked by browser");
    });
  } catch (err) {
    console.log("Audio error:", err);
  }
}

  lastOrdersCount = orders.length;

  allOrders = orders;

  renderOrders(allOrders);
}

// ================= RENDER ORDERS =================
function renderOrders(orders) {
  document.getElementById("content").innerHTML =
    orders.map(o => `
      <div class="card order-card">

        <h3>Order #${o._id}</h3>

        <p>👤 ${o.userId?.email || "غير معروف"}</p>
        <p>💰 ${o.total || 0} EGP</p>

        <p class="status ${o.status}">
          📦 ${o.status || "pending"}
        </p>
       
        <input 
          id="tracking-${o._id}"
          placeholder="Tracking Number" 
          value="${o.trackingNumber || ""}"
          class="input"
        />

        <div class="actions">

          <button onclick="updateOrderStatus('${o._id}','shipped')" class="btn">
            🚚 شحن
          </button>

          <button onclick="updateOrderStatus('${o._id}','delivered')" class="btn primary">
            ✅ تم
          </button>

          <button onclick="updateOrderStatus('${o._id}','cancelled')" class="btn danger">
            ❌ إلغاء
          </button>

          <button onclick="viewOrder('${o._id}')" class="btn">
            👁 عرض
          </button>

        </div>

        <div class="order-items">
          ${o.items.map(i => `
            <div>🛒 ${i.name} - ${i.qty || i.meters}</div>
          `).join("")}
        </div>

      </div>
    `).join("");
}

function viewOrder(orderId) {
  const order = allOrders.find(o => o._id === orderId);

  if (!order) return;

  showToast(`
    📦 تفاصيل الأوردر:
    👤 ${order.userId?.email}
    💰 ${order.total} EGP
    🛒 عدد المنتجات: ${order.items.length}
  `);
}

// ================= FILTER =================
function filterOrders(status) {
  if (status === "all") {
    renderOrders(allOrders);
  } else {
    const filtered = allOrders.filter(o => o.status === status);
    renderOrders(filtered);
  }

}
//----------search--------------------------
function searchOrders(text) {
  const filtered = allOrders.filter(o =>
    o.userId?.email?.toLowerCase().includes(text.toLowerCase())
  );

  renderOrders(filtered);
}

// ================= UPDATE STATUS =================
async function updateOrderStatus(orderId, status) {
  const input = document.getElementById(`tracking-${orderId}`);
  const trackingNumber = input ? input.value : "";

  await fetch(`${API}/admin/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ status, trackingNumber })
  });

  showToast("🚚 Request has been updated", "add");

  loadOrders();
}

// ================= TOP PRODUCTS =================
async function loadTopProducts() {
  const res = await fetch(`${API}/admin/top-products`, {
    headers: { Authorization: "Bearer " + token }
  });

  const products = await res.json();

  document.getElementById("topProducts").innerHTML =
    products.map(p => `
      <div class="top-product">
        🔥 ${p.name} - ${p.sold} مبيعات
      </div>
    `).join("");
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
// ================= UPDATE STATUS =================


// ================= TOP PRODUCTS =================

//=================load user============
async function loadUsers() {
  const res = await fetch(`${API}/admin/users`, {
    headers: { Authorization: "Bearer " + token }
  });

  const users = await res.json();

  document.getElementById("content").innerHTML =
    users.map(u => `
      <div class="card user-card">

        <h3>${u.firstName || ""} ${u.lastName || ""}</h3>
        <p>📧 ${u.email}</p>
        <p>👑 ${u.role || "user"}</p>

        <div class="actions">

        ${isSuperAdmin ? `
  <button onclick="makeAdmin('${u._id}')" class="btn primary">
    👑 Admin
  </button>
` : ""}

          ${isSuperAdmin ? `
  <button onclick="deleteUser('${u._id}')" class="btn danger">
    🗑 حذف
  </button>
` : ""}

        </div>

      </div>
    `).join("");
}
//================delet user=================
async function deleteUser(id) {
  await fetch(`${API}/admin/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  showToast("🗑 User has been deleted", "remove");

  loadUsers();
}
//================make user==================
async function makeAdmin(id) {
  await fetch(`${API}/admin/users/${id}`, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token }
  });

  showToast("👑It has been converted to Admin", "add");

  loadUsers();
}
//=============updateTracking============
async function updateTracking(orderId, trackingNumber) {
  await fetch(`${API}/admin/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ trackingNumber })
  });

  showToast("📦 Tracking number has been updated", "add");
}

//==============================اللون=================
function addColor() {
  const div = document.createElement("div");

  div.style.marginBottom = "10px";

  div.innerHTML = `
    <input placeholder="اسم اللون">
    <input placeholder="كود اللون (#fff أو #000,#fff)">
    <button onclick="this.parentElement.remove()">حذف</button>
  `;

  document.getElementById("colorsContainer").appendChild(div);
}
//======================اللون======================
function getColors() {
  const colorsDivs = document.querySelectorAll("#colorsContainer div");

  const colors = [];

  colorsDivs.forEach(div => {
    const inputs = div.querySelectorAll("input");

    let codes = inputs[1].value.trim();

    // لو فيه لونين
    if (codes.includes(",")) {
      codes = codes.split(",").map(c => c.trim());
    }

    colors.push({
      name: inputs[0].value.trim(),
      codes: codes
    });
  });

  return colors;
}
let editingId = null;

async function editProduct(id) {
  const res = await fetch(`${API}/admin/products`, {
    headers: { Authorization: "Bearer " + token }
  });

  const products = await res.json();
  const p = products.find(x => x._id === id);

  if (!p) return;

  editingId = id;

  // fill inputs
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("oldPrice").value = p.oldPrice || "";
  document.getElementById("rating").value = p.rating || 5;
  document.getElementById("category").value = p.category;
  document.getElementById("description").value = p.description || "";
  document.getElementById("dimensions").value = p.dimensions || "";

  document.getElementById("hasMeters").checked = p.hasMeters;
  document.getElementById("bestSeller").checked = p.bestSeller;

  showToast("✏️ Edit the product and then press Add." , "add");
}



//===================admin-login ande out================//
function logout() {
  // امسح التوكن
  localStorage.removeItem("token");

  // ممكن تمسح كاش المنتجات كمان
  localStorage.removeItem("allProducts");
  localStorage.removeItem("allProducts_time");

  // رجوع لصفحة الأدمن لوجين
  window.location.href = "/admin-login.html";
}
window.loadOrders = loadOrders;
window.loadProducts = loadProducts;
window.loadUsers = loadUsers;
window.filterOrders = filterOrders;
window.searchOrders = searchOrders;
window.updateOrderStatus = updateOrderStatus;
window.viewOrder = viewOrder;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.makeAdmin = makeAdmin;
window.deleteUser = deleteUser;
window.addProduct = addProduct;
window.logout = logout;
window.addColor = addColor;