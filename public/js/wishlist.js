/* ================== WISHLIST ================== */
  const tokenw = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async function () {

  await loadProducts(); // 🔥 مهم جدًا

  initWishlistPage();

});
// ===== FETCH =====
let WISHLIST_CACHE = null;
let WISHLIST_LOADING = false;

async function fetchWishlist(force = false) {

  if (!tokenw) return [];

  // 🔥 لو فيه cache استخدمه
  if (!force && WISHLIST_CACHE) {
    return WISHLIST_CACHE;
  }

  // 🔥 لو request شغال بالفعل → استنى
  if (WISHLIST_LOADING) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!WISHLIST_LOADING) {
          clearInterval(interval);
          resolve(WISHLIST_CACHE || []);
        }
      }, 100);
    });
  }

  try {
    WISHLIST_LOADING = true;

    const res = await fetch(`${window.API}/wishlist`, {
      headers: { Authorization: "Bearer " + tokenw }
    });

    if (!res.ok) {
      WISHLIST_LOADING = false;
      return [];
    }

    const data = await res.json();

    let list = data?.wishlist || data || [];

    if (!Array.isArray(list)) list = [];

    // 🔥 لو objects
    if (list.length && typeof list[0] === "object") {
      list = list.map(item => item.productId || item._id || item.id);
    }

    // 🔥 normalize + تنظيف
    list = list
      .map(id => String(id))
      .filter(id => id && id !== "null" && id !== "undefined");

    // 🔥 الحل الأساسي: شيل المنتجات اللي اتحذفت
    if (window.PRODUCTS_MAP) {
      list = list.filter(id => window.PRODUCTS_MAP[id]);
    }

    // 🔥 cache
    WISHLIST_CACHE = list;
    WISHLIST_LOADING = false;

    return list;

  } catch (err) {
    WISHLIST_LOADING = false;
    console.error(err);
    return [];
  }
}
// ===== ADD =====
async function addToWishlistAPI(productId) {

  
  if (!tokenw) return [];

  try {

    const res = await fetch(`${window.API}/wishlist/${productId}`, {
      method: "POST",
      headers: { Authorization: "Bearer " + tokenw }
    });

    return await res.json();

  } catch (err) {
    console.error("addToWishlist error:", err);
    return [];
  }
}


// ===== REMOVE =====
async function removeFromWishlistAPI(productId) {

  if (!tokenw) return [];

  try {

    const res = await fetch(`${window.API}/wishlist/${productId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + tokenw }
    });

    return await res.json();

  } catch (err) {
    console.error("removeFromWishlist error:", err);
    return [];
  }
}


// ===== TOGGLE =====
async function toggleWishlist(productId) {

  if (!tokenw) {
    showToast("⚠ Please log in first", "remove");
    return false;
  }

  let current = window.USER_WISHLIST || [];

  let updated;

  if (current.includes(String(productId))) {

    await removeFromWishlistAPI(productId);

    updated = current.filter(id => id !== String(productId));

    showToast("Deleted from Wishlist", "remove");

  } else {

    await addToWishlistAPI(productId);

    updated = [...current, String(productId)];

    showToast("Added to Wishlist", "add");
  }

  // 🔥 أهم سطر
  window.USER_WISHLIST = updated;

  updateWishlistUI(updated);
  updateWishlistCount();

  return updated.includes(String(productId));
}


// ===== CLICK HANDLER =====
async function handleWishlist(e, btn, productId) {

  e.preventDefault();
  e.stopPropagation();

  if (!btn) return;

  await toggleWishlist(productId);
}


// ===== REMOVE FROM PAGE =====
async function removeFromWishlist(e, btn, productId) {

  e.preventDefault();
  e.stopPropagation();

  await removeFromWishlistAPI(productId);

  // 🔥 تحديث الكاش مباشرة
  let current = window.USER_WISHLIST || [];

  const updated = current.filter(id => id !== String(productId));

  window.USER_WISHLIST = updated;

  // حذف الكارت من الصفحة
  const card = btn.closest(".product_card");
  if (card) card.remove();

  updateWishlistUI(updated);
  updateWishlistCount();
}


// ===== COUNT =====
function updateWishlistCount() {

  const el = document.getElementById("wishlistCount");
  if (!el) return;

  const list = window.USER_WISHLIST || [];

  el.textContent = list.length;
}
// ===== UI =====
function updateWishlistUI(list) {

  const mapped = list.map(String);
  window.USER_WISHLIST = mapped;

  document.querySelectorAll(".card_wishlist_btn").forEach(btn => {

    const id = String(btn.dataset.id);
    const active = mapped.includes(id);

    btn.classList.toggle("active", active);

    const icon = btn.querySelector("i");

    if (icon) {
      icon.classList.toggle("fa-solid", active);
      icon.classList.toggle("fa-regular", !active);
    }
  });
}


// ===== INIT PAGE =====
async function initWishlistPage() {

  if (!document.body.classList.contains("page-wishlist")) return;

  const grid = document.getElementById("wishlistGrid");
  if (!grid) return;

  const ids = await fetchWishlist();
  const mapped = ids.map(String);

  window.USER_WISHLIST = mapped;

  if (!mapped.length) {
    grid.innerHTML = "<p>📭 لا توجد منتجات في المفضلة</p>";
    return;
  }

  grid.innerHTML = "";

  mapped.forEach(id => {

    const prod = window.PRODUCTS_MAP?.[id];

    if (!prod) return;

    var card = document.createElement("div");
    card.className = "product_card";

    card.innerHTML = `
      <div class="product_img">

        <a href="${getProductUrl(prod)}" class="product_link">
          ${getImageHtml(prod)}
        </a>

        <button
          data-id="${prod.id}"
          class="card_wishlist_btn active"
          onclick="removeFromWishlist(event, this, ${prod.id})">
          
          <i class="fa-solid fa-heart"></i>
        </button>

      </div>

<h3 class="product_title">

  <a href="${getProductUrl(prod)}">
    ${prod.name}
  </a>

</h3>
      <div class="product_meta">${translateCategory(prod.category)}</div>

      <button class="btn" onclick="handleAddToCart(this, ${prod.id})">
        أضف للسلة
      </button>
    `;

    grid.appendChild(card);
  });

  updateWishlistCount();
}