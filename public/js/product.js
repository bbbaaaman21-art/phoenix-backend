/* ================== PRODUCT PAGE ================== */
async function initProductPage() {

  if (!document.body.classList.contains("page-product")) return;

  const id = getQueryParam("id");
  if (!id) return;

  try {
    
    const res = await fetch(`${window.API}/products/${id}`);

    if (!res.ok) throw new Error("Failed to load product");

    const prod = await res.json();
    window.TEST_PROD = prod;
    if (!prod) return;

    console.log("PRODUCT:", prod);

    const imgEl    = document.getElementById("productImage");
    const nameEl   = document.getElementById("productName");
    const priceEl  = document.getElementById("productPrice");
    const catEl    = document.getElementById("productCategory");
    const descEl   = document.getElementById("productDescription");
const dimEl = document.getElementById("productDimensions");


    const addBtn   = document.getElementById("addToCartBtn");
    const qtyInput = document.getElementById("qtyInput");

    const metersInput = document.getElementById("metersInput");
    const metersWrap  = document.getElementById("metersWrap");
    const qtyWrap     = document.getElementById("qtyWrap");

    const materialsWrap = document.getElementById("materialsOptions");
    const colorsWrap = document.getElementById("colorOptions");
    const wishlistBtn   = document.getElementById("productWishlistBtn");

    // ✅ SEO TITLE
      document.title = prod.name + " | Rovix Home";

     // ✅ SEO DESCRIPTION
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", prod.description);
    }

    // ================= WISHLIST =================
if (wishlistBtn) {

  // 🔥 حالة الزر عند التحميل
  const isActive = window.USER_WISHLIST?.includes(String(prod.id));

  const icon = wishlistBtn.querySelector("i");

  if (isActive) {
    wishlistBtn.classList.add("active");

    if (icon) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    }
  } else {
    wishlistBtn.classList.remove("active");

    if (icon) {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  }

  // 🔥 عند الضغط
  wishlistBtn.onclick = async (e) => {

    await handleWishlist(e, wishlistBtn, prod.id);

    // 🔥 تحديث فوري بعد التغيير
    const updatedActive = window.USER_WISHLIST?.includes(String(prod.id));

    const icon = wishlistBtn.querySelector("i");

    if (updatedActive) {
      wishlistBtn.classList.add("active");

      if (icon) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }
    } else {
      wishlistBtn.classList.remove("active");

      if (icon) {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      }
    }
  };
}

    // ================= IMAGE =================
 if (imgEl) {

   let img = prod.imageWebp || prod.image;// 🔥 الكبيرة

  if (!img) {
    imgEl.src = "img/placeholder.webp";
    return;
  }

  if (img.startsWith("/uploads/")) {
    img = "https://rovixhome.com" + img;
  }

  imgEl.src = img;
}


    // ================= IMAGE ZOOM =================
    if (imgEl && imgEl.parentElement) {
      const wrapper = imgEl.parentElement;

      wrapper.addEventListener("mousemove", function (e) {
        const rect = wrapper.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        imgEl.style.transformOrigin = `${x}% ${y}%`;
        imgEl.style.transform = "scale(2)";
      });

      wrapper.addEventListener("mouseleave", function () {
        imgEl.style.transform = "scale(1)";
        imgEl.style.transformOrigin = "center";
      });
    }


    // ================= TEXT =================
    if (nameEl) nameEl.textContent = prod.name;
    if (catEl)  catEl.textContent  = prod.category;
    if (descEl) descEl.textContent = prod.description || "";


    // ================= METERS =================
    if (prod.hasMeters) {

      if (metersWrap) metersWrap.style.display = "block";
      if (qtyWrap)    qtyWrap.style.display    = "none";

      if (metersInput) {
        metersInput.addEventListener("input", function () {
          updatePrice();
        });
      }

    } else {

      if (metersWrap) metersWrap.style.display = "none";
      if (qtyWrap)    qtyWrap.style.display    = "block";
    }


    // ================= MATERIALS =================
    // ================= PRODUCT TYPE =================

if (addBtn) {
  addBtn.disabled = false;
}

if (prod.hasMeters) {

  if (metersWrap) metersWrap.style.display = "block";
  if (qtyWrap) qtyWrap.style.display = "none";

  if (metersInput) {
    metersInput.addEventListener("input", function () {
      updatePrice();
    });
  }

} else {

  if (metersWrap) metersWrap.style.display = "none";
  if (qtyWrap) qtyWrap.style.display = "block";
}


// ================= MATERIALS =================

let selectedMaterial = null;

window.selectedMaterial = null;

const materialsBox = document.getElementById("materialsBox");

if (materialsWrap && prod.materials?.length) {

  if (materialsBox) materialsBox.style.display = "block";

  materialsWrap.innerHTML = "";

  // شكل الزرار كأنه disabled
  if (addBtn) {
    addBtn.classList.add("disabled-cart");
  }

  prod.materials.forEach((m) => {

    const btn = document.createElement("button");

    btn.className = "materials_btn";

    btn.textContent = `${m.name} - ${formatPrice(m.price)} / م²`;

    btn.onclick = () => {

      document.querySelectorAll(".materials_btn")
        .forEach(b => b.classList.remove("active"));

      btn.classList.add("active");

      selectedMaterial = m;

      window.selectedMaterial = m;

      updatePrice();

      // تفعيل شكل الزرار
      if (addBtn) {
        addBtn.classList.remove("disabled-cart");
      }
    };

    materialsWrap.appendChild(btn);
  });

} else {

  // المنتجات العادية بدون خامات
  selectedMaterial = null;

  window.selectedMaterial = null;

  updatePrice();
}

    window.selectedMaterial = selectedMaterial;
    // ================= COLORS =================
let selectedColor = null;

if (colorsWrap && prod.colors?.length) {

  colorsWrap.innerHTML = "";

  prod.colors.forEach((c, i) => {

    const dot = document.createElement("button");
    dot.className = "color_dot" + (i === 0 ? " active" : "");

    // 🔥 رسم اللون
    if (Array.isArray(c.codes)) {

      if (c.codes.length === 2) {
        dot.style.background = `
          linear-gradient(135deg, 
            ${c.codes[0]} 50%, 
            ${c.codes[1]} 50%)
        `;

      } else if (c.codes.length > 2) {
        dot.style.background = `conic-gradient(${c.codes.join(",")})`;

      } else {
        dot.style.background = c.codes[0];
      }

    } else {
      dot.style.background = c.codes;
    }

    // 🔥 الأبيض
    if (
      (Array.isArray(c.codes) && c.codes.includes("#ffffff")) ||
      c.codes === "#ffffff"
    ) {
      dot.style.border = "2px solid #ccc";
    }

    dot.onclick = () => {
      document.querySelectorAll(".color_dot")
        .forEach(d => d.classList.remove("active"));

      dot.classList.add("active");

      selectedColor = c;
      window.selectedColor = c;
    };

    colorsWrap.appendChild(dot);
  });

  selectedColor = prod.colors[0];
  window.selectedColor = prod.colors[0];
}

// ================= PRICE =================
function updatePrice() {

  if (!priceEl) return;

const meters = parseFloat(metersInput?.value) || 0;
  // 🔥 لو محتاج متر
  if (prod.hasMeters && meters <= 0) {

    priceEl.innerHTML = "ادخل عدد الأمتار";

    if (addBtn) addBtn.disabled = true;

    return;
  }

  // 🔥 منتجات بالمتر
  if (prod.hasMeters) {

    let mat = selectedMaterial;

    if (!mat && prod.materials?.length) {
      mat = prod.materials.reduce((min, m) =>
        m.price < min.price ? m : min
      );
    }

    if (!mat) return;

    const total = meters * mat.price;

    priceEl.innerHTML = `
      <div style="font-size:28px;font-weight:bold;color:#ff5a2c">
        ${formatPrice(total)}
      </div>

      <div style="font-size:14px;color:#777;margin-top:5px">
        ${formatPrice(mat.price)} / م²
      </div>
    `;

  } else {

    priceEl.innerHTML = `
      <div style="font-size:24px;font-weight:bold;color:#ff5a2c">
        ${
          prod.oldPrice && prod.oldPrice > prod.price
            ? "<span class='old_price'>" + formatPrice(prod.oldPrice) + "</span> "
            : ""
        }
        ${formatPrice(prod.price)}
      </div>
    `;
  }
}
//=============dimensions============//

if (prod.dimensions && dimEl) {
  dimEl.textContent = prod.dimensions;
} else if (dimEl) {
  dimEl.style.display = "none";
}
// ================= INIT AFTER LOAD =================
if (typeof addToRecentViewed === "function") {
  addToRecentViewed(prod.id);
}

updatePrice();

if (typeof renderRecentViewed === "function") {
  renderRecentViewed();
}

if (typeof renderRelatedProducts === "function") {
  renderRelatedProducts(prod);
}
   // ================= ADD TO CART =================
if (addBtn) {

  addBtn.onclick = async () => {

    const user = localStorage.getItem("user");

    if (!user) {
      showToast("⚠ Please log in first", "remove");
      return;
    }

    if (prod.materials?.length && !selectedMaterial) {
  showToast("Please pick the material first", "remove");
  return;
}

let meters = 1;
let qty = 1;

// 🔥 لو منتج بالمتر
if (prod.hasMeters) {

  meters = parseFloat(
    metersInput?.value?.trim()
  );

  if (isNaN(meters) || meters <= 0) {

    showToast(
      "Enter the number of meters",
      "remove"
    );

    return;
  }

  qty = 1;

} else {

  // 🔥 منتج عادي
  qty = Number(qtyInput?.value) || 1;
  meters = 1;
}
    // ================= PAYLOAD =================
    let payload = {
      productId: prod.id,
      name: prod.name,
      image: prod.image
    };

    if (prod.hasMeters) {

      payload.meters = meters;

      if (selectedMaterial) {
        payload.material = {
          name: selectedMaterial.name
        };
      }

    } else {

      payload.qty = qty;
    }

    // 🔥 اللون
    if (window.selectedColor) {
      payload.color = window.selectedColor;
    }

    console.log("FINAL SENT:", payload);

try {

  await addToCartAPI(payload);

  // 🔥 تحديث الكاش فورًا
  let current = CART_CACHE || [];

  current.push({
    ...payload,
    hasMeters: prod.hasMeters
  });

  CART_CACHE = current;

  updateCartCount();

  showToast("The product has been added to the cart", "add");

} catch (e) {
  console.error("Cart error:", e);
  showToast("An error occurred during the addition process.", "remove");
}
  };
}

 // END initProductPage

  } catch (err) {
    console.error("Product error:", err);
  }
}
// 🔥 تشغيل الصفحة
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

  initProductPage();
});
// ================== RECENT VIEWED ==================
function getRecentViewed() {
  try {
    var raw = localStorage.getItem("phoenix_recent");
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRecentViewed(list) {
  localStorage.setItem("phoenix_recent", JSON.stringify(list));
}

function addToRecentViewed(productId) {

  var list = getRecentViewed();

  list = list.filter(function (id) {
    return id !== Number(productId);
  });

  list.unshift(Number(productId));

  if (list.length > 6) {
    list = list.slice(0, 6);
  }

  saveRecentViewed(list);
}
/* ================== RENDER RECENT ================== */
function renderRecentViewed() {

  var wrap = document.getElementById("recentList");
  if (!wrap || !window.PRODUCTS) return;

  var ids = getRecentViewed();
  wrap.innerHTML = "";

  if (!ids.length) {
    wrap.innerHTML = "<p class='empty_text'>لم تقم بمشاهدة منتجات بعد.</p>";
    return;
  }

  ids.forEach(function (id) {

    var prod = window.PRODUCTS_MAP?.[id];

    if (!prod) return;

    var item = document.createElement("a");
    item.className = "recent_item";
    item.href = getProductUrl(prod);

    item.innerHTML = `
      <div class="recent_img">
        ${getImageHtml(prod)}
      </div>

      <div class="recent_info">
        <div class="recent_name">${prod.name}</div>
        <div class="recent_price">${formatPrice(prod.price)}</div>
      </div>
    `;

    wrap.appendChild(item);
  });
}


/* ================== RELATED PRODUCTS ================== */
function renderRelatedProducts(prod) {

  var wrap = document.getElementById("relatedGrid");
  if (!wrap || !window.PRODUCTS) return;

  var related = window.PRODUCTS
    .filter(function (p) {
      return p.category === prod.category && p.id !== prod.id;
    })
    .slice(0, 5);

  wrap.innerHTML = "";

  if (!related.length) {
    wrap.innerHTML =
      "<p class='empty_text'>لا توجد منتجات ذات صلة حاليًا.</p>";
    return;
  }

  related.forEach(function (p) {

    if (!p) return;

    var card = document.createElement("a");
    card.className = "related_card";
    card.href = getProductUrl(p);

    card.innerHTML = `
      <div class="related_img">
        ${getImageHtml(p)}
      </div>

      <div class="related_name">${p.name}</div>
      <div class="related_price">${formatPrice(p.price)}</div>
    `;

    wrap.appendChild(card);
  });
}
// ===== FIX PRODUCT IMAGE STRUCTURE =====
document.addEventListener("DOMContentLoaded", function(){

  const oldImg = document.querySelector(".product_img img");

  if (oldImg) {

    oldImg.id = "mainProductImage";

    const wrapper = document.createElement("div");
    wrapper.className = "product_images";

    const main = document.createElement("div");
    main.className = "main_image";
    main.appendChild(oldImg.cloneNode(true));

    const thumbs = document.createElement("div");
    thumbs.className = "thumbs";
    thumbs.id = "productThumbs";

    wrapper.appendChild(main);
    wrapper.appendChild(thumbs);

    oldImg.parentElement.replaceWith(wrapper);
  }

});