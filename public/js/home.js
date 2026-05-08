 // ================= 🔥 LAZY SWIPER INIT FUNCTION =================
  function initSwiperOnView(selector, callback) {

    const el = document.querySelector(selector);
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    });

    observer.observe(el);
  }
// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

  // ================= SEARCH =================

  // ================= 🔥 SMART LOAD PRODUCTS =================
  loadProducts().then(() => {
    console.log("HOME PRODUCTS:", window.PRODUCTS);

    // ✅ بناء الأقسام بعد تحميل المنتجات
    if (document.getElementById("homeCategoryRows")) {
      buildHomeCategoryRows();
    }
  });

  // ================= 🔥 DEFER WISHLIST & CART =================
  setTimeout(async () => {

    try {
      const list = await fetchWishlist();
      window.USER_WISHLIST = list;
      updateWishlistCount();

      const cart = await fetchCart();
      CART_CACHE = cart;
      updateCartCount();
    } catch (e) {
      console.error("Wishlist/Cart load error:", e);
    }

  }, 0);


 
  // ================= HERO =================
  if (document.querySelector(".heroSwiper")) {
    new Swiper(".heroSwiper", {
      loop: true,
      speed: 700,
      grabCursor: true,

      preloadImages: false,
      lazy: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,

      slidesPerView: 1,

      autoplay: { delay: 4500, disableOnInteraction: false },

      pagination: {
        el: ".heroSwiper .swiper-pagination",
        clickable: true
      },

      navigation: {
        nextEl: ".hero_next",
        prevEl: ".hero_prev"
      }
    });
  }




  // ================= CATEGORIES =================
  initSwiperOnView(".categoriesSwiper", () => {
    new Swiper(".categoriesSwiper", {
      loop: false,
      grabCursor: true,

      preloadImages: false,
      lazy: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,

      spaceBetween: 16,
      slidesPerView: 3,

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".cat_next",
        prevEl: ".cat_prev",
      },

      breakpoints: {
        0:   { slidesPerView: 2, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 12 },
        768: { slidesPerView: 3 },
        1200:{ slidesPerView: 4 }
      }
    });
  });


  // ================= BEST SELLERS =================
  initSwiperOnView("#bestSellersSlider", () => {
  loadBestSellers();
});

}); // END DOM



// ================= BEST SELLERS FUNCTION =================
async function loadBestSellers() {

  if (!document.querySelector("#bestSellersSlider")) return;

  try {

    // 🔥 Skeleton قبل التحميل
    showSkeleton("bestSellersSlider");

    const cached = localStorage.getItem("bestSellers");

    if (cached) {
      const data = JSON.parse(cached);
      renderBestSellers(data);
      return;
    }

    const res = await fetch(`${window.API}/products/best-sellers`);

    if (!res.ok) {
      throw new Error("Failed to load best sellers");
    }

    const best = await res.json();

    console.log("BEST SELLERS:", best);

    localStorage.setItem("bestSellers", JSON.stringify(best));

    renderBestSellers(best);

  } catch (err) {
    console.error("Best sellers error:", err);
  }
}
// ================= RENDER FUNCTION =================
function renderBestSellers(best) {

  const wrapper = document.querySelector("#bestSellersSlider .swiper-wrapper");
  if (!wrapper) return;

  let html = "";

  best.forEach(function (prod) {

    html += `
      <div class="swiper-slide">
        <div class="product_card">

          <div class="product_img">
            <a href="${getProductUrl(prod)}" class="product_link">
              ${getImageHtml(prod)}
            </a>

            ${getBadgesHtml(prod)}

            <button
              data-id="${prod.id}"
              class="card_wishlist_btn ${window.USER_WISHLIST?.includes(String(prod.id)) ? 'active' : ''}"
              onclick="handleWishlist(event, this, ${prod.id})">

              <i class="${window.USER_WISHLIST?.includes(String(prod.id)) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
          </div>

          <h3 class="product_title">${prod.name}</h3>
          <div class="product_meta">قسم: ${translateCategory(prod.category)}</div>

          ${getRatingHtml(prod)}
          ${getPriceHtml(prod)}

          <div class="product_actions">
            <button class="btn" onclick="handleAddToCart(this, ${prod.id})">
            أضف للسلة 🛒
            </button>
          </div>

        </div>
      </div>
    `;
  });

  // 🔥 render مرة واحدة
  wrapper.innerHTML = html;




  // ================= 🔥 INIT SWIPER =================
  initSwiperOnView("#bestSellersSlider", () => {

    // ❗ مهم: منع تكرار السلايدر
   const el = document.querySelector("#bestSellersSlider");
if (el.swiper) return;

    new Swiper("#bestSellersSlider", {
      slidesPerView: 4,
      spaceBetween: 20,
      loop: best.length > 4,
      grabCursor: true,

      preloadImages: false,
      lazy: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,

      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },

      navigation: {
        nextEl: ".prod_next",
        prevEl: ".prod_prev",
      },

      breakpoints: {
        0:   { slidesPerView: 2, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 12 },
        768: { slidesPerView: 3 },
        1200:{ slidesPerView: 4 }
      }
    });

  });

}
// ================= HOME CATEGORY ROWS =================
function buildHomeCategoryRows() {

  var holder = document.getElementById("homeCategoryRows");
  if (!holder || !window.PRODUCTS) return;

  // 🔥 Skeleton أولي
 holder.innerHTML = `
  <div class="skeleton_row">
    <div class="skeleton_card"></div>
    <div class="skeleton_card"></div>
    <div class="skeleton_card"></div>
  </div>
`;

  let allRowsHTML = "";

  CATEGORY_ORDER.forEach(function (catSlug, index) {

    var list = window.PRODUCTS.filter(function (p) {
      return p.category === catSlug;
    });

    if (!list.length) return;

    var swiperClass = "homeCatSwiper_" + catSlug;
    var nextClass   = "homeCatNext_"   + catSlug;
    var prevClass   = "homeCatPrev_"   + catSlug;

    allRowsHTML += `
      <section class="home_cat_row" data-cat="${catSlug}">

        <a href="category.html?cat=${catSlug}" class="link_more">
          عرض كل منتجات القسم
        </a>

        <div class="swiper home_cat_swiper ${swiperClass}">
          <div class="swiper-wrapper">

            ${list.map(function (prod) {

              const safeProd = {
                ...prod,
                image: prod.image || "img/placeholder.webp"
              };

              return `
                <div class="swiper-slide">
                  <div class="product_card">

                    <a href="product.html?id=${safeProd.id}" class="product_link">
                      <div class="product_img">
                        ${getImageHtml(safeProd)}
                        ${getBadgesHtml(safeProd)}
                      </div>
                    </a>

                    <h3 class="product_title">${safeProd.name}</h3>

                    ${getRatingHtml(safeProd)}
                    ${getPriceHtml(safeProd)}

                    <div class="product_actions">

                      <button class="btn" onclick="handleAddToCart(this, ${safeProd.id})">
                      أضف للسلة 🛒
                      </button>

                      <button
                        data-id="${safeProd.id}"
                        class="card_wishlist_btn ${window.USER_WISHLIST?.includes(String(safeProd.id)) ? 'active' : ''}"
                        onclick="handleWishlist(event, this, ${safeProd.id})">

                        <i class="${window.USER_WISHLIST?.includes(String(safeProd.id)) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>

                      </button>

                    </div>

                  </div>
                </div>
              `;
            }).join("")}

          </div>

          <div class="swiper-button-next ${nextClass}"></div>
          <div class="swiper-button-prev ${prevClass}"></div>

        </div>

      </section>
    `;
  });

  // 🔥 render مرة واحدة
  holder.innerHTML = allRowsHTML;


  // ================= 🔥 LAZY SWIPER INIT =================
 

 // ================= 🔥 INIT EACH CATEGORY =================
CATEGORY_ORDER.forEach(function (catSlug, index) {

  var swiperClass = ".homeCatSwiper_" + catSlug;

  const el = document.querySelector(swiperClass);
  if (!el) return;

  initSwiperOnView(swiperClass, () => {

    // ❗ منع التكرار (بعد ما العنصر يظهر)
    if (el.swiper) return;

    new Swiper(el, {
      loop: false,
      speed: 600,
      grabCursor: true,

      preloadImages: false,
      lazy: true,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,

      spaceBetween: 18,

      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
        reverseDirection: index % 2 === 1
      },

      navigation: {
        nextEl: ".homeCatNext_" + catSlug,
        prevEl: ".homeCatPrev_" + catSlug,
      },

      breakpoints: {
        0:   { slidesPerView: 2, spaceBetween: 10 },
        576: { slidesPerView: 2, spaceBetween: 12 },
        768: { slidesPerView: 3 },
        1200:{ slidesPerView: 4 }
      }
    });

  });

});

}