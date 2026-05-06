/* ================== ADD ================== */

requireAuth();

/* ================== CART CACHE ================== */
let CART_CACHE = [];

/* ================== ADD API ================== */
async function addToCartAPI(item) {
  try {

    if (item.color && typeof item.color !== "object") {
      item.color = {
        name: item.color,
        codes: null
      };
    }

    console.log("FINAL SENT:", item);

    const res = await fetch(`${API}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(item)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "error");
    }

    return data;

  } catch (err) {
    console.error(err);
    showToast("Product addition error", "remove");
  }
}

/* ================== FETCH ================== */
async function fetchCart() {
  try {
    
    if (!token) return [];

    const res = await fetch(`${API}/cart`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) return [];

    const data = await res.json();

    // 🔥 cache
    CART_CACHE = data;

    return data;

  } catch (err) {
    console.error(err);
    return [];
  }
}


/* ================== HANDLE ADD ================== */
async function handleAddToCart(btn, productId) {
  try {
   

    if (!token) {
      showToast("⚠ Please log in first", "remove");
      return;
    }

    const res = await fetch(`${API}/products/${productId}`);
    const product = await res.json();

    if (!product || product.message) {
      showToast("The product is not available.", "remove");
      return;
    }

    let meters = 1;
    let material = null;

    if (product.hasMeters) {
      meters = Number(document.getElementById("metersInput")?.value) || 1;
      material = window.selectedMaterial;
    }

    const payload = {
      productId: product.id,
      qty: 1,
      meters
    };

    if (material) {
      payload.material = {
        name: material.name
      };
    }

    if (window.selectedColor) {
      payload.color = {
        name: window.selectedColor.name,
        codes: window.selectedColor.codes
      };
    }

    console.log("🔥 CLEAN PAYLOAD:", payload);

    await addToCartAPI(payload);

    // 🔥 تحديث الكاش فورًا
    let current = CART_CACHE || [];

    current.push({
      ...payload,
      hasMeters: product.hasMeters
    });

    CART_CACHE = current;

    updateCartCount();

    showToast("The product has been added to the cart", "add");

    btn.textContent = "تمت الإضافة ✔";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = "أضف للسلة";
      btn.disabled = false;
    }, 1500);

  } catch (err) {
    console.error(err);
    showToast("An error occurred", "remove");
  }
}


/* ================== COUNT ================== */
function updateCartCount() {

  const el = document.getElementById("cartCount");
  if (!el) return;

  const cart = CART_CACHE || [];

  const totalQty = cart.reduce((sum, item) => {
    return sum + (item.hasMeters ? item.meters : item.qty || 0);
  }, 0);

  el.textContent = totalQty;
}


/* ================== REMOVE ================== */
async function removeFromCartAPI(cartItemId) {
  try {

    await fetch(`${API}/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ cartItemId })
    });

    // 🔥 تحديث الكاش
    CART_CACHE = (CART_CACHE || []).filter(
  item => item._id !== cartItemId
);

    updateCartCount();

    showToast("The product has been deleted", "remove");

    // لو في صفحة الكارت
    if (typeof renderCartTable === "function") {
      renderCartTable();
    }

  } catch (err) {
    console.error(err);
  }
}

/* ================== INIT ================== */
function initCartPage() {
  if (!document.body.classList.contains("page-cart")) return;
  renderCartTable();
}


/* ================== RENDER ================== */
function renderCartTable() {

  var tableBody = document.getElementById("cartBody");
  var totalEl   = document.getElementById("cartTotal");

  if (!tableBody || !totalEl) return;

  var cart = CART_CACHE || [];

  tableBody.innerHTML = "";

  if (!cart.length) {
    tableBody.innerHTML =
      '<tr><td colspan="6">السلة فارغة حالياً.</td></tr>';
    totalEl.textContent = "الإجمالي: 0 EGP";
    return;
  }

  var total = 0;

  cart.forEach(function (item) {

    if (!item) return;

    var price = 0;

    // 🔥 المنتجات بالمتر
    if (item.hasMeters === true) {

      const product = (window.PRODUCTS || []).find(p => p.id == item.productId);

      const mat = product?.materials?.find(
        m => m.name === item.material?.name
      );

      if (mat) {
        price = mat.price;
      }

    } else {
      price = item.price || 0;
    }

    var isMeter = item.material && item.material.name;

    var count = isMeter ? item.meters : item.qty;

    var itemTotal = price * count;

    total += itemTotal;

    var row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <img src="${item.image || '/img/default.png'}" 
        style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
      </td>

      <td>${formatPrice(price)}</td>
      <td>${item.name || "منتج"}</td>

      <td>${isMeter ? item.meters + " متر" : "-"}</td>

      <td>${item.qty || "-"}</td>

      <td>${item.material?.name || "-"}</td>

      <td>${formatPrice(itemTotal)}</td>

      <td>
        <button class="btn"
          onclick="removeFromCartAPI('${item._id}')">
          حذف
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  totalEl.textContent = "الإجمالي: " + formatPrice(total);
}


/* ================== LOAD ================== */
document.addEventListener("DOMContentLoaded", async function () {

  // 🔥 products
  await loadProducts();

  // 🔥 wishlist
  const list = await fetchWishlist();
  window.USER_WISHLIST = list;
  updateWishlistCount();

  // 🔥 cart
  const cart = await fetchCart();
  CART_CACHE = cart;
  updateCartCount();

  // 🔥 page
  initCartPage();
});

// 🔥 GO TO CHECKOUT
window.goToCheckout = async function () {

  const token = localStorage.getItem("token");

  // ❌ مش مسجل دخول
  if (!token) {
    localStorage.setItem("redirectAfterLogin", "checkout.html");
    window.location.href = "auth.html";
    return;
  }

  try {
    const cart = CART_CACHE || [];

    // ❌ السلة فاضية
    if (!cart.length) {
      showToast("Cart is empty, add products first.", "remove");
      return;
    }

    // ✅ تمام
    window.location.href = "checkout.html";

  } catch (err) {
    console.error(err);
    showToast("An error occurred", "remove");
  }
};