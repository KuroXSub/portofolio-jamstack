// .eleventy.js
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

  // 2. Beri tahu Eleventy di mana harus mencari file
  return {
    dir: {
      input: "src",       // Folder sumber
      includes: "_includes",// Folder untuk layout/partial
      data: "_data",      // Folder untuk data JSON
      output: "_site"     // Folder hasil build (ini yang akan di-deploy)
    },
    // Izinkan HTML/Nunjucks di semua file template
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};