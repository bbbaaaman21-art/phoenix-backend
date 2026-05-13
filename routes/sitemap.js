const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

router.get("/sitemap.xml", async (req, res) => {

  const products = await Product.find();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  xml += `
  <url>
    <loc>https://rovixhome.com/</loc>
  </url>

  <url>
    <loc>https://rovixhome.com/category.html?cat=all</loc>
  </url>
`;

  products.forEach((p) => {

    xml += `
    <url>
      <loc>
        https://rovixhome.com/product.html?id=${p.id}
      </loc>
    </url>
    `;
  });

  xml += `</urlset>`;

  res.header("Content-Type", "application/xml");

  res.send(xml);

});

module.exports = router;