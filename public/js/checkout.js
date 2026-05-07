/* ================== CHECKOUT PAGE ================== */
/* ===== get address ===== */
function getCheckoutAddress() {

  const mode =
    document.querySelector('input[name="addressMode"]:checked')?.value;

  // ===== NEW ADDRESS =====
  if (mode === "new") {

    const label = document.getElementById("newLabel")?.value.trim();
    const city = document.getElementById("newCity")?.value.trim();
    const street = document.getElementById("newStreet")?.value.trim();
    const details = document.getElementById("newDetails")?.value.trim();

    if (!city || !street) return null;

    return { label, city, street, details };
  }

  // ===== SAVED ADDRESS =====
  const checked = document.querySelector('input[name="address"]:checked');
  if (!checked) return null;

  const card = checked.closest(".address_item");

  return {
    label: card.querySelector("strong")?.innerText || "",
    city: card.innerText.split("-")[0]?.trim() || "",
    street: card.innerText.split("-")[1]?.trim() || "",
    details: ""
  };
}


/* ================== INIT ================== */
document.addEventListener("DOMContentLoaded", async function () {

  if (!document.body.classList.contains("page-checkout")) return;

  // 🔥 core init (موحد في كل الصفحات)
  await loadProducts();

  const list = await fetchWishlist();
  window.USER_WISHLIST = list;
  updateWishlistCount();

  CART_CACHE = await fetchCart();
  updateCartCount();

  // ===== AUTH =====
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
 

  if (!user || !token) {
    localStorage.setItem("redirectAfterLogin", "checkout.html");
    window.location.href = "auth.html";
    return;
  }

  // ===== ADDRESS =====
  try {
    const res = await fetch(`${API}/addresses`, {
      headers: { Authorization: "Bearer " + token }
    });

    const addresses = await res.json();

    const box = document.getElementById("addressBox");

    if (!box) return;

    if (!addresses.length) {
      box.innerHTML = "لا توجد عناوين محفوظة";
    }

    box.innerHTML = "";

    addresses.forEach(addr => {
      box.innerHTML += `
        <label class="address_item">
          <input type="radio" name="address" value="${addr._id}">
          <strong>${addr.label}</strong><br>
         ${addr.city} - ${addr.street}<br>
          ${addr.details || ""}
        </label>
      `;
    });

  } catch (err) {
    console.error(err);
  }

  // ===== TOGGLE NEW ADDRESS =====
  const radios = document.querySelectorAll('input[name="addressMode"]');
  const newBox = document.getElementById("newAddressFields");

  radios.forEach(r => {
    r.addEventListener("change", () => {
      newBox.classList.toggle("active", r.value === "new");
    });
  });

  // ===== SUMMARY =====
  renderCheckoutSummary();

  const form = document.getElementById("checkoutForm");
  const waBtn = document.getElementById("confirmWhatsApp");
  const visaBtn = document.getElementById("payByVisa");

  function getCustomerName() {
    const nameInput = document.getElementById("fullName");
    return nameInput?.value.trim() || "عميل";
  }
  //=======================================//
async function sendOrderToWhatsApp() {

  const address = getCheckoutAddress();
  if (!address) return;

  const cart = CART_CACHE || [];

  if (!cart.length) {
    showToast("Cart is empty", "remove");
    return;
  }

  // 🧑 اسم العميل
  const customerName = getCustomerName();

  // 🔥 رقم طلب عشوائي
  const orderId = "ORD-" + Date.now().toString().slice(-6);

  let message = "🛍️ *طلب جديد*%0A%0A";

  message += `👤 العميل: ${customerName}%0A`;
  message += `🧾 رقم الطلب: ${orderId}%0A%0A`;

  let total = 0;

  cart.forEach(item => {

    const isMeter = item.material && item.material.name;
    const count = isMeter ? item.meters : item.qty;
    const price = item.price || 0;
    const itemTotal = price * count;

    total += itemTotal;

    message += `🛒 ${item.name}%0A`;

    message += isMeter
      ? `📏 الكمية: ${count} متر%0A`
      : `📦 الكمية: ${count} قطعة%0A`;

    if (item.material?.name) {
      message += `🧱 الخامة: ${item.material.name}%0A`;
    }

    if (item.color?.name) {
      message += `🎨 اللون: ${item.color.name}%0A`;
    }

    message += `💰 السعر: ${formatPrice(itemTotal)}%0A`;
    message += `--------------------%0A`;
  });

  // 🚚 الشحن
  let shipping = total < 10000 ? 200 : 0;
  const finalTotal = total + shipping;

  message += `%0A💵 الإجمالي: ${formatPrice(total)}%0A`;
  message += `🚚 الشحن: ${shipping === 0 ? "مجاني 🎉" : formatPrice(shipping)}%0A`;
  message += `💰 الإجمالي النهائي: ${formatPrice(finalTotal)}%0A`;

  // 📍 العنوان
  message += `%0A📍 *العنوان:*%0A`;
  message += `${address.city} - ${address.street}%0A`;
  if (address.details) {
    message += `${address.details}%0A`;
  }

  const phone = "201275444579";
  const url = `https://wa.me/${phone}?text=${message}`;

  // 🧹 امسح الكارت
  await clearCartAfterOrder();

  window.open(url, "_blank");
  window.location.href = "index.html";
}

async function clearCartAfterOrder() {
  try {

    const cart = CART_CACHE || [];

    for (const item of cart) {
      await removeFromCartAPI(item.productId);
    }

    // 🔥 فضي الكاش
    CART_CACHE = [];

    updateCartCount();

  } catch (err) {
    console.error("CLEAR CART ERROR:", err);
  }
}

// ===== WHATSAPP =====
if (waBtn) {
  waBtn.addEventListener("click", () => {
    const address = getCheckoutAddress();

    if (!address) {
      showToast("⚠ Please select or enter an address", "remove");
      return;
    }

    sendOrderToWhatsApp();
  });
}

// ===== VISA =====
if (visaBtn) {
  visaBtn.addEventListener("click", () => {
    showToast("Visa payment is not currently available.", "remove");
  });
}

// ===== SUBMIT =====
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const address = getCheckoutAddress();

    if (!address) {
      showToast("⚠Please select or enter an address", "remove");
      return;
    }

    submitOrderToDB();
  });
}

});
async function renderCheckoutSummary() {

  const itemsWrap = document.getElementById("checkoutItems");
  const subEl = document.getElementById("checkoutSubtotal");
  const shipEl = document.getElementById("checkoutShipping");
  const totalEl = document.getElementById("checkoutTotal");

  if (!itemsWrap || !subEl || !shipEl || !totalEl) return;

 
  if (!token) {
    itemsWrap.innerHTML = "<p>سجل دخول أولاً</p>";
    return;
  }

  try {
    const cart = CART_CACHE || [];

    itemsWrap.innerHTML = "";

    if (!cart.length) {
      itemsWrap.innerHTML = "<p>السلة فارغة</p>";
      subEl.textContent = "0";
      shipEl.textContent = "0";
      totalEl.textContent = "0";
      return;
    }

    let subtotal = 0;
    let qty = 0;

    cart.forEach(item => {

      if (!item) return;

      let price = item.price || 0;
      const isMeter = item.material && item.material.name;
      let count = isMeter ? item.meters : item.qty;

      const itemTotal = price * count;

      subtotal += itemTotal;
      qty += count;

      itemsWrap.innerHTML += `
        <div class="checkout_item">
          <div>
            ${item.name || "منتج"}
            ${isMeter ? " - " + item.meters + " متر" : " - " + item.qty + " قطعة"}
            ${item.material?.name ? " - " + item.material.name : ""}
            ${item.color?.name ? " - " + item.color.name : ""}
            × ${count}
          </div>
          <div>${formatPrice(itemTotal)}</div>
        </div>
      `;
    });

    let shipping = 0;

    if (subtotal < 10000) {
      shipping = 200;
    }

    const total = subtotal + shipping;

    subEl.textContent = formatPrice(subtotal);

    if (shipping === 0) {
      shipEl.textContent = "مجاني 🎉";
    } else {
      shipEl.textContent = formatPrice(shipping);
    }

    totalEl.textContent = formatPrice(total);

  } catch (err) {
    console.error(err);
    itemsWrap.innerHTML = "<p>حصل خطأ في تحميل البيانات</p>";
  }
}
async function submitOrderToDB() {



  const name = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = getCheckoutAddress();

  if (!name || !phone || !address) {
    showToast("Please complete your details", "remove");
    return;
  }

  try {
    const cart = CART_CACHE || [];

    if (!cart.length) {
      showToast("Cart is empty", "remove");
      return;
    }

    let total = 0;

    cart.forEach(item => {
      let price = item.price || 0;
      const isMeter = item.material && item.material.name;
      let count = isMeter ? item.meters : item.qty;

      total += price * count;
    });

    const res = await fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        fullName: name,
        phone,
        items: Array.isArray(cart) ? cart : cart.items,
        total,
        address
      })
    });

    const data = await res.json();

    if (!res.ok) {
      showToast(data.message || "Failed to place order", "remove");
      return;
    }

    showToast("Order placed successfully", "add");

    // 🔥 فضي الكارت من السيرفر
    await fetch(`${API}/cart/clear`, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    // 🔥 فضي الكاش
    CART_CACHE = [];

    updateCartCount();

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);

  } catch (err) {
    console.error(err);
    showToast("Server error", "remove");
  }

}