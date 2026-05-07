requireAuth();

const rawUser = localStorage.getItem("user");
const user = rawUser ? JSON.parse(rawUser) : null;
const token = localStorage.getItem("token");

/* ===== بيانات المستخدم في الهيدر ===== */
if (user) {
  document.getElementById("userName").innerText =
    user.firstName + " " + user.lastName;

  document.getElementById("userEmail").innerText = user.email;
}
/* ====
============== فتح التابات ================== */
function openTab(event, id) {
  document.querySelectorAll('.tab_content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.menu_item').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.currentTarget.classList.add('active');

  if(id === 'orders') loadOrders();
  if(id === 'addresses') loadAddresses();
  if(id === 'settings') loadProfileFields();
  if(id === 'notifications') loadNotifications();

}

/* ================== الطلبات ================== */

function loadOrders() {
  fetch(`${API}/orders/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(orders => {
      const preview = document.getElementById("ordersPreview");
      const full = document.getElementById("ordersList");

      if (preview) preview.innerHTML = "";
      if (full) full.innerHTML = "";

      if (!orders.length) {
        if (preview) preview.innerText = "لا توجد طلبات حتى الآن";
        if (full) full.innerText = "لا توجد طلبات حتى الآن";
        return;
      }

      orders.forEach(order => {
     const card = `
  <div class="order_card">

    <div class="order_head">
      <strong>#${order._id}</strong>

      <span class="status ${order.status || "pending"}">
        ${order.status || "pending"}
      </span>
    </div>

    <p>💰 المبلغ: <strong>${order.total}</strong> جنيه</p>

    <p>📅 التاريخ: ${new Date(order.createdAt).toLocaleDateString()}</p>

    <p>📦 الحالة: ${order.status || "pending"}</p>

    <p>
  🔢 رقم التتبع: 
  <strong style="color:#0a7cff">
    ${order.trackingNumber || "لم يتم الشحن بعد"}
  </strong>
</p>

    <div class="order_actions">

     <button
  class="btn_primary"
  onclick="downloadInvoice('${order._id}')"
>
  🧾 تحميل الفاتورة
</button>

      <button
        class="btn_danger"
        onclick="deleteOrder('${order._id}')"
      >
        🗑️ حذف الطلب
      </button>

        <button
    class="btn_danger"
    onclick="cancelOrder('${order._id}')"
  >
    ❌ إلغاء الطلب
  </button>
    </div>

  </div>
`;

        if (preview) preview.innerHTML += card;
        if (full) full.innerHTML += card;
      });
    });
}

function cancelOrder(orderId) {
  if (!confirm("هل تريد إلغاء الطلب؟")) return;

  fetch(`${API}/orders/${orderId}/cancel`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      showToast(data.message || "Cancelled", "add");

      loadOrders();
    });
}
/* ================== حذف طلب واحد ================== */

function deleteOrder(orderId) {
  if (!confirm("هل أنت متأكد من حذف هذا الطلب؟")) return;

  fetch(`${API}/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
  console.log("CANCEL RESPONSE:", data);

  showToast("The order has been cancelled", "add");

  loadOrders();
});
}

/* ================== PDF ================== */

function downloadInvoice(orderId) {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("لازم تسجل دخول");
    return;
  }

  // 🔥 افتح رابط الفاتورة مباشرة
  window.open(
    `${API}/orders/${orderId}/invoice?token=${token}`,
    "_blank"
  );
}

/* ================== العناوين ================== */

function loadAddresses() {
  fetch(`${API}/addresses`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(addresses => {
      const box = document.getElementById("addressList");
      box.innerHTML = "";

      if (!addresses.length) {
        box.innerText = "لا توجد عناوين محفوظة";
        return;
      }

      addresses.forEach(addr => {
        box.innerHTML += `
          <div class="address_card ${addr.isDefault ? "default" : ""}">
            <div style="flex:1">
              <div class="address_head">
                <strong>${addr.label}</strong>
                ${
                  addr.isDefault
                    ? `<span class="badge_default">⭐ افتراضي</span>`
                    : `<button class="set_default" onclick="setDefaultAddress('${addr._id}')">
                         ⭐ تعيين افتراضي
                       </button>`
                }
              </div>

              <p>${addr.city} - ${addr.street}</p>
              <small>${addr.details || ""}</small>
            </div>

            <div class="actions">
              <button onclick="editAddress('${addr._id}')">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button onclick="deleteAddress('${addr._id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      });
    });
}

function saveAddress() {
  const id = document.getElementById("addrId").value;

  const data = {
    label: document.getElementById("addrLabel").value,
    city: document.getElementById("addrCity").value,
    street: document.getElementById("addrStreet").value,
    details: document.getElementById("addrDetails").value
  };

  const url = id ? `${API}/addresses/${id}` : `${API}/addresses`;
  const method = id ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      resetAddressForm();
      loadAddresses();
    });
}

function editAddress(id) {
  fetch(`${API}/addresses`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(addresses => {
      const addr = addresses.find(a => a._id === id);
      if (!addr) return;

      document.getElementById("addrId").value = addr._id;
      document.getElementById("addrLabel").value = addr.label;
      document.getElementById("addrCity").value = addr.city;
      document.getElementById("addrStreet").value = addr.street;
      document.getElementById("addrDetails").value = addr.details || "";

      document.getElementById("addressForm").classList.remove("hidden");
    });
}

function deleteAddress(id) {
  if (!confirm("هل أنت متأكد من حذف العنوان؟")) return;

  fetch(`${API}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(() => loadAddresses());
}

function setDefaultAddress(id) {
  fetch(`${API}/addresses/${id}/default`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(() => loadAddresses());
}

function resetAddressForm() {
  document.getElementById("addrId").value = "";
  document.getElementById("addrLabel").value = "";
  document.getElementById("addrCity").value = "";
  document.getElementById("addrStreet").value = "";
  document.getElementById("addrDetails").value = "";
  document.getElementById("addressForm").classList.add("hidden");
}

/* ================== الإشعارات ================== */

function loadNotifications() {
  fetch(`${API}/notifications`, {
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(list => {
      const popBox = document.getElementById("notifList");
      const fullBox = document.getElementById("notifListFull");
      const topBadge = document.getElementById("notifCount");      // فوق في الجرس
      const sideBadge = document.getElementById("sideNotifCount"); // في القائمة

      popBox.innerHTML = "";
      fullBox.innerHTML = "";

      if (!list.length) {
        popBox.innerHTML = "<p>لا توجد إشعارات</p>";
        fullBox.innerHTML = "<p>لا توجد إشعارات</p>";
        topBadge.classList.add("hidden");
        sideBadge.classList.add("hidden");
        return;
      }

      let unread = 0;

      list.forEach(n => {
        if (!n.isRead) unread++;

        const item = `
          <div class="notif_item ${n.type}">
            
            <div class="notif_text" onclick="markNotificationRead('${n._id}')">
              ${n.message}
              <small>${new Date(n.createdAt).toLocaleString()}</small>
            </div>

            <button 
              class="notif_delete"
              onclick="deleteNotification('${n._id}')">
              ✖
            </button>

          </div>
        `;

        popBox.innerHTML += item;
        fullBox.innerHTML += item;
      });

      if (unread > 0) {
        topBadge.innerText = unread;
        sideBadge.innerText = unread;
        topBadge.classList.remove("hidden");
        sideBadge.classList.remove("hidden");
      } else {
        topBadge.classList.add("hidden");
        sideBadge.classList.add("hidden");
      }
    });
}

/* ================== حذف إشعار واحد ================== */


  function deleteNotification(id) {
  fetch(`${API}/notifications/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Delete failed");
      }
      return res.json();
    })
    .then(() => {
      showToast("The notification has been deleted", "add");
      loadNotifications();
    })
    .catch(err => {
      console.error(err);
      showToast("An error occurred during deletion", "remove");
    });
}

/* ================== حذف كل الإشعارات ================== */

function deleteAllNotifications() {
  fetch(`${API}/notifications`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(() => {
      loadNotifications();
    });
}

/* ================== تعليم كمقروء ================== */

function markNotificationRead(id) {
  fetch(`${API}/notifications/${id}/read`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(() => {
      loadNotifications();
    });
}

document.addEventListener("DOMContentLoaded", async function () {

  if (!document.body.classList.contains("page-account")) return;

  // 🔥 core init (موحد في كل المشروع)
  await loadProducts();

  const list = await fetchWishlist();
  window.USER_WISHLIST = list;
  updateWishlistCount();

  CART_CACHE = await fetchCart();
  updateCartCount();

  // 🔥 notifications
  loadNotifications();
});
/* ================== الإعدادات ================== */

/* تحميل بيانات المستخدم داخل الفورم */
function loadProfileFields() {
  document.getElementById("setFirst").value = user.firstName;
  document.getElementById("setLast").value = user.lastName;
  document.getElementById("setEmail").value = user.email;
}

/* تحديث الاسم والإيميل */
function updateProfile() {
  const firstName = document.getElementById("setFirst").value;
  const lastName = document.getElementById("setLast").value;
  const email = document.getElementById("setEmail").value;

  fetch(`${API}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ firstName, lastName, email })
  })
    .then(res => res.json())
    .then(data => {
      const msg = document.getElementById("settingsMsg");
      msg.style.color = data.error ? "red" : "green";
      msg.innerText = data.error || "تم تحديث البيانات بنجاح";

      if (!data.error) {
        localStorage.setItem("user", JSON.stringify(data.user));
        location.reload();
      }
    });
}

/* تغيير كلمة المرور من تبويب الإعدادات */
function changePasswordFromSettings() {
  const oldPass = document.getElementById("oldPass2").value;
  const newPass = document.getElementById("newPass2").value;
  const confirmPass = document.getElementById("confirmPass2").value;
  const msg = document.getElementById("settingsMsg");

  msg.innerText = "";

  if (!oldPass || !newPass || !confirmPass) {
    msg.innerText = "املأ كل الحقول";
    msg.style.color = "red";
    return;
  }

  if (newPass !== confirmPass) {
    msg.innerText = "كلمة المرور غير متطابقة";
    msg.style.color = "red";
    return;
  }

 fetch(`${API}/user/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ oldPass, newPass })
  })
    .then(res => res.json())
    .then(data => {
      msg.style.color = data.error ? "red" : "green";
      msg.innerText = data.error || data.message;

      document.getElementById("oldPass2").value = "";
      document.getElementById("newPass2").value = "";
      document.getElementById("confirmPass2").value = "";
    });
}

function uploadAvatar() {
  const file = document.getElementById("setAvatar").files[0];
  const msg = document.getElementById("settingsMsg");

  if (!file) {
    msg.innerText = "اختر صورة أولاً";
    msg.style.color = "red";
    return;
  }

  const formData = new FormData();
  formData.append("avatar", file);

  fetch(`${API}/user/avatar`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        msg.innerText = data.error;
        msg.style.color = "red";
      } else {
        user.avatar = data.avatar;
        localStorage.setItem("user", JSON.stringify(user));
        msg.innerText = "تم تحديث الصورة بنجاح 🎉";
        msg.style.color = "green";

        // تحديث الهيدر فوراً
        loadAvatarUI();
      }
    });
}
function loadAvatarUI() {
  const box = document.getElementById("avatarLetterOrImg");

  if (user.avatar) {
    box.style.background = "none";

    box.innerHTML = `
      <img 
        src="${API.replace("/api", "")}/uploads/${user.avatar}"
        style="
          width:44px;
          height:44px;
          border-radius:50%;
          object-fit:cover;
          display:block;
        "
      >
    `;

  } else {
    box.innerHTML = user.firstName.charAt(0).toUpperCase();
    box.style.background = "#111";
    box.style.color = "#fff";
  }
}

loadAvatarUI();

function deleteAvatar() {
  const msg = document.getElementById("settingsMsg");

  fetch(`${API}/user/avatar`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        msg.innerText = data.error;
        msg.style.color = "red";
      } else {
        user.avatar = data.avatar;
        localStorage.setItem("user", JSON.stringify(user));
        msg.innerText = "تم حذف الصورة بنجاح 🎉";
        msg.style.color = "green";
        loadAvatarUI();
      }
    })
    .catch(() => {
      msg.innerText = "حدث خطأ";
      msg.style.color = "red";
    });
}



// 🔥 TABS
window.openTab = function(event, id) {

  document.querySelectorAll('.tab_content')
    .forEach(t => t.classList.remove('active'));

  document.querySelectorAll('.menu_item')
    .forEach(b => b.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  event.currentTarget.classList.add('active');

  if (id === 'orders') loadOrders();
  if (id === 'addresses') loadAddresses();
};

// 🔥 ADDRESS FORM
window.toggleAddressForm = function() {
  document.getElementById('addressForm')
    .classList.toggle('hidden');
};