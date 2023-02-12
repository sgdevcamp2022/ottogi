const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@shared": path.resolve(__dirname, "src/components/shared"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@views": path.resolve(__dirname, "src/views"),
    },
  },
};
