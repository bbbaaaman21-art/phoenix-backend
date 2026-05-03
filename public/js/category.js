/* ================== CATEGORY PAGE ================== */
document.addEventListener("DOMContentLoaded", async function () {

  await loadProducts();

// 🔥 wishlist
const list = await fetchWishlist();
window.USER_WISHLIST = list;
updateWishlistCount();

// 🔥 cart
const cart = await fetchCart();
CART_CACHE = cart;
updateCartCount();

  initCategoryPage();
});


function initCategoryPage() {

  if (!document.body.classList.contains("page-category")) return;

  var cat    = getQueryParam("cat") || "all";
  var search = getQueryParam("search") || "";

  var titleEl = document.getElementById("pageTitle");
  var grid    = document.getElementById("categoryGrid");

  if (!grid || !window.PRODUCTS) return;

  // ===== title =====
  if (titleEl) {
    if (search) {
      titleEl.textContent = 'نتائج البحث عن: "' + search + '"';
    } else if (cat === "all") {
      titleEl.textContent = "كل المنتجات";
    } else {
      titleEl.textContent = translateCategory(cat);
    }
  }

  // ===== all categories =====
  if (cat === "all" && !search) {
    renderAllCategoriesSections(grid);
    return;
  }

  // ===== grid =====
  grid.classList.remove("categories-products");
  grid.classList.add("products_grid_page");
  grid.innerHTML = "";

  var filtered = window.PRODUCTS.slice();

  if (cat !== "all") {
    filtered = filtered.filter(function (p) {
      return p.category === cat;
    });
  }

  if (search) {
    var s = search.toLowerCase();
    filtered = filtered.filter(function (p) {
      return p.name.toLowerCase().includes(s);
    });
  }

  if (!filtered.length) {
    grid.innerHTML = "<p>لا توجد منتجات مطابقة حاليًا.</p>";
    return;
  }

  // ================= RENDER =================
  filtered.forEach(function (prod) {

    var card = document.createElement("div");
    card.className = "product_card";

    card.innerHTML = `
      <a href="${getProductUrl(prod)}" class="product_link">
        <div class="product_img">
          ${getImageHtml(prod)}
          ${getBadgesHtml(prod)}
        </div>
      </a>

      <h3 class="product_title">${prod.name}</h3>
      <div class="product_meta">قسم: ${translateCategory(prod.category)}</div>

      ${getRatingHtml(prod)}
      ${getPriceHtml(prod)}

      <div class="product_actions">
        <button class="btn" onclick="handleAddToCart(this, ${prod.id})">
        أضف للسلة 🛒
        </button>

        <button
          data-id="${prod.id}"
          class="card_wishlist_btn ${window.USER_WISHLIST?.includes(String(prod.id)) ? 'active' : ''}"
          onclick="handleWishlist(event, this, ${prod.id})">

          <i class="${window.USER_WISHLIST?.includes(String(prod.id)) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>

        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}


/* ====== عرض كل الكاتيجوريز مقسّمة ====== */
function renderAllCategoriesSections(grid) {

  grid.classList.remove("products_grid_page");
  grid.classList.add("categories-products");
  grid.innerHTML = "";

  var byCat = {};

  window.PRODUCTS.forEach(function (p) {
    if (!byCat[p.category]) byCat[p.category] = [];
    byCat[p.category].push(p);
  });

  var cats = Object.keys(byCat);

  cats.sort(function (a, b) {
    var ia = CATEGORY_ORDER.indexOf(a);
    var ib = CATEGORY_ORDER.indexOf(b);

    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;

    return ia - ib;
  });

  cats.forEach(function (slug) {

    var list = byCat[slug];
    if (!list.length) return;

    var block = document.createElement("section");
    block.className = "category-block";

    var h2 = document.createElement("h2");
    h2.textContent = translateCategory(slug);

    block.appendChild(h2);

    var wrap = document.createElement("div");
    wrap.className = "category-products";

    list.forEach(function (prod) {

      var card = document.createElement("div");
      card.className = "product_card";

      card.innerHTML = `
        <a href="${getProductUrl(prod)}" class="product_link">
          <div class="product_img">
            ${getImageHtml(prod)}
            ${getBadgesHtml(prod)}
          </div>
        </a>

        <h3 class="product_title">${prod.name}</h3>
        <div class="product_meta">قسم: ${translateCategory(prod.category)}</div>

        ${getRatingHtml(prod)}
        ${getPriceHtml(prod)}

        <div class="product_actions">
          <button class="btn" onclick="handleAddToCart(this, ${prod.id})">
          أضف للسلة 🛒
          </button>

          <button
            data-id="${prod.id}"
            class="card_wishlist_btn ${window.USER_WISHLIST?.includes(String(prod.id)) ? 'active' : ''}"
            onclick="handleWishlist(event, this, ${prod.id})">

            <i class="${window.USER_WISHLIST?.includes(String(prod.id)) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>

          </button>
        </div>
      `;

      wrap.appendChild(card);
    });

    block.appendChild(wrap);
    grid.appendChild(block);
  });
}