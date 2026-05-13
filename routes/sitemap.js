const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.get("/sitemap.xml", async (req, res) => {

  const products = await Product.find();

  const categories = [
    "all",
    "dressing",
    "hairdo",
    "komod",
    "buffet",
    "units_tv",
    "units_table",
    "tables",
    "units_ki",
    "coffee_corner",
    "books",
    "office",
    "units_sh"
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>

<urlset
xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // ================= MAIN PAGES =================

  const staticPages = [
    "",
    "category.html?cat=all",
    "wishlist.html",
    "cart.html",
    "account.html"
  ];

  staticPages.forEach((page) => {

    xml += `
    <url>

      <loc>
        https://rovixhome.com/${page}
      </loc>

      <changefreq>daily</changefreq>

      <priority>1.0</priority>

    </url>
    `;
  });

  // ================= CATEGORIES =================

  categories.forEach((cat) => {

    xml += `
    <url>

      <loc>
        https://rovixhome.com/category.html?cat=${cat}
      </loc>

      <changefreq>daily</changefreq>

      <priority>0.9</priority>

    </url>
    `;
  });

  // ================= PRODUCTS =================

  products.forEach((p) => {

    xml += `
    <url>

      <loc>
        https://rovixhome.com/product.html?id=${p.id}
      </loc>

      <lastmod>
        ${new Date(
          p.updatedAt
        ).toISOString()}
      </lastmod>

      <changefreq>weekly</changefreq>

      <priority>0.8</priority>

    </url>
    `;
  });

  xml += `
</urlset>
`;

  res.header(
    "Content-Type",
    "application/xml"
  );

  res.send(xml);

});

module.exports = router;