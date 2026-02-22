// .eleventy.js

const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // 1. "Passthrough Copy" (Menyalin folder utuh ke hasil build)
  // Ini seperti folder 'static' di Flask
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/admin"); // Agar admin panel bisa diakses

  // --- TAMBAHKAN INI ---
  // Collection untuk Portofolio
  eleventyConfig.addCollection("portofolio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .filter(item => item.data.category === 'portofolio' && item.data.is_active)
      .sort((a, b) => {
        if (a.data.is_pinned !== b.data.is_pinned) return b.data.is_pinned - a.data.is_pinned;
        if (a.data.order !== b.data.order) return a.data.order - b.data.order;
        return b.date - a.date;
      });
  });

  // Collection untuk Blog
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .filter(item => item.data.category === 'blog' && item.data.is_active)
      .sort((a, b) => {
        if (a.data.is_pinned !== b.data.is_pinned) return b.data.is_pinned - a.data.is_pinned;
        if (a.data.order !== b.data.order) return a.data.order - b.data.order;
        return b.date - a.date;
      });
  });

// 2. TAMBAHKAN KODE FILTER INI:
  // Kita akan membuat filter baru bernama "postDate"
  eleventyConfig.addFilter("postDate", (dateObj) => {
    // 'dateObj' adalah objek tanggal dari front matter
    // .toFormat("LLL dd, yyyy") akan menghasilkan format seperti: "Nov 13, 2025"
    return DateTime.fromJSDate(dateObj).toFormat("LLL dd, yyyy");
  });

  // (Opsional, tapi sangat berguna) Filter untuk format yang lebih mudah dibaca
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    // Menghasilkan format seperti: "13 November 2025"
    return DateTime.fromJSDate(dateObj).toFormat("dd LLLL yyyy", { locale: 'id' });
  });


  // 3. Pastikan Anda mengembalikan konfigurasi Anda di akhir
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};