// ================= GLOBAL =================
window.API = "http://localhost:3000/api";

window.PRODUCTS = [];
window.PRODUCTS_MAP = {};
window.USER_WISHLIST = [];

// ================= IMAGE HANDLER =================
window.getImageHtml = function (prod) {

  if (!prod) {
    return `<img src="img/placeholder.webp" loading="lazy">`;
  }

  // 🔥 الكارت = الصورة الصغيرة فقط
  let img = prod.image;

  if (!img) {
    return `<img src="img/placeholder.webp" loading="lazy">`;
  }

  if (img.startsWith("/uploads/")) {
    img = "http://localhost:3000" + img;
  }

  return `
    <img 
      src="${img}" 
      loading="lazy"
      decoding="async"
       width="300"
       height="300"
      alt="${prod.name}"
    >
  `;

};

// ================= SEARCH =================
window.handleSearch = function () {
  const input = document.getElementById("searchInput");

  if (!input) return;

  const value = input.value.trim();

  if (!value) {
    showToast("Write the search term");
    return;
  }

  window.location.href = `category.html?search=${encodeURIComponent(value)}`;
};


// ================= LOAD PRODUCTS =================
window.PRODUCTS_LOADED = false;

window.loadProducts = async function () {

  if (window.PRODUCTS_LOADED) return;

  try {

    const CACHE_TIME = 1000 * 60 * 10; // نص ساعة

    const cached = localStorage.getItem("allProducts");
    const cachedTime = parseInt(localStorage.getItem("allProducts_time"), 10);

    // ✅ استخدم الكاش لو صالح
    if (
      cached &&
      cachedTime &&
      !isNaN(cachedTime) &&
      (Date.now() - cachedTime < CACHE_TIME)
    ) {
      try {
        const data = JSON.parse(cached);

        window.PRODUCTS = data;
        window.PRODUCTS_MAP = {};

        data.forEach(p => {
          window.PRODUCTS_MAP[p.id] = p;
        });

        window.PRODUCTS_LOADED = true;

        console.log("✅ PRODUCTS FROM CACHE");
        return;

      } catch (e) {
        // ❌ الكاش بايظ → امسحه
        localStorage.removeItem("allProducts");
        localStorage.removeItem("allProducts_time");
      }
    }

    // 🔄 fetch من السيرفر
    const res = await fetch(`${window.API}/products`);

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    if (!Array.isArray(data)) return;

    // ✅ خزّن
    localStorage.setItem("allProducts", JSON.stringify(data));
    localStorage.setItem("allProducts_time", Date.now().toString());

    window.PRODUCTS = data;
    window.PRODUCTS_MAP = {};

    data.forEach(p => {
      window.PRODUCTS_MAP[p.id] = p;
    });

    window.PRODUCTS_LOADED = true;

    console.log("🔥 PRODUCTS FROM API");

  } catch (err) {
    console.error("❌ Error loading products", err);
  }
};

// ================= SKELETON =================
window.showSkeleton = function (containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="swiper-wrapper">
      ${Array(6).fill().map(() => `
        <div class="swiper-slide">
          <div class="skeleton_card">
            <div class="skeleton skeleton_img"></div>
            <div class="skeleton skeleton_text"></div>
            <div class="skeleton skeleton_text short"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
};


// ================= PRICE =================
window.formatPrice = function (value) {
  return "EGP " + Number(value).toLocaleString("en-EG");
}


window.getPriceHtml = function (prod) {

  const isKitchen = prod.hasMeters;

  let basePrice = prod.price || 0;

  if (isKitchen && Array.isArray(prod.materials) && prod.materials.length) {

    const prices = prod.materials
      .map(m => Number(m.price))
      .filter(p => !isNaN(p));

    if (prices.length) {
      basePrice = Math.min(...prices);
    }
  }

  return `
    <div class="price">
      ${prod.oldPrice && prod.oldPrice > basePrice 
        ? "<span class='old_price'>" + window.formatPrice(prod.oldPrice) + "</span> "
        : ""} 
      ${window.formatPrice(basePrice)} ${isKitchen ? "/ م²" : ""}
    </div>
  `;
};


// ================= BADGES =================
window.getBadgesHtml = function (prod) {

  let html = "";

  if (prod.oldPrice && prod.oldPrice > prod.price) {
    let percent = (
      ((prod.oldPrice - prod.price) / prod.oldPrice) * 100
    ).toFixed(1);

    html += `<span class="badge badge-main">-${percent}%</span>`;
  }

  if (prod.badge2) {
    html += `<span class="badge badge-second">${prod.badge2}</span>`;
  }

  if (!html) return "";

  return `<div class="badges_wrap">${html}</div>`;
};


// ================= RATING =================
window.getRatingHtml = function (prod) {
  const rating = Number(prod.rating) || 0;

  let stars = "";

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars += `<i class="fa-solid fa-star"></i>`;
    } else if (rating >= i - 0.5) {
      stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
    } else {
      stars += `<i class="fa-regular fa-star"></i>`;
    }
  }

  return `
    <div class="rating_stars">
      ${stars}
    </div>
  `;
};


// ================= HELPERS =================
window.getQueryParam = function (key) {
  var params = new URLSearchParams(window.location.search);
  return params.get(key);
};
// ================= CATEGORY =================
window.CATEGORY_NAMES = {
  units_table:   "ترابيزة + وحدات",
  dressing:      "دريسنج",
  buffet:        "بوفيه",
  units_tv:      "وحدات تليفزيون",
  units_ki:      "وحدات مطبخ",
  coffee_corner: "كوفي كورنر",
  hairdo:        "تسريحة",
  tables:        "ترابيزات",
  books:         "مكتبة",
  komod:         "كومود",
  units_sh:      "وحدات أحذية",
  office:        "مكتب",

  living:  "غرف المعيشة",
  bedroom: "غرف النوم",
  coffee:  "كوفي كورنر",
  storage: "وحدات تخزين",
  dining:  "سفرة",

  all: "كل المنتجات"
};

window.CATEGORY_ORDER = [
  "units_table",
  "dressing",
  "buffet",
  "units_tv",
  "units_ki",
  "coffee_corner",
  "hairdo",
  "tables",
  "books",
  "komod",
  "units_sh",
  "office"
];

window.translateCategory = function(cat) {
  return window.CATEGORY_NAMES[cat] || "منتجات";
};
//============id====================
window.getProductUrl = function (prod) {

  const name = prod.name
    .toLowerCase()
    .replace(/\s+/g, "-")       // مسافات → -
    .replace(/[^\w\-]+/g, "");  // حذف الرموز

  return `product.html?id=${prod.id}&name=${name}`;
};