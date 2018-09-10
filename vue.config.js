const fs = require("fs");
const glob = require("glob");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

function resolve(dir) {
  return path.join(__dirname, dir);
}

function generatePages() {
  let pages = {};
  let entries = glob("src/pages/*/*.js", { sync: true });

  entries.forEach(filepath => {
    const index = filepath.lastIndexOf(".");

    let filename = filepath.substring(filepath.lastIndexOf("/") + 1, index);

    let pageHtml = filepath.substring(0, index) + `.html`;

    if (!fs.existsSync(pageHtml)) {
      pageHtml = filepath.substring(0, index) + "/_default.html";
    }

    pages[filename] = {
      entry: filepath,
      template: pageHtml,
      filename: `${filename}.html`,
      chunks: ["chunk-vendors", "chunk-common", filename]
    };
  });

  return pages;
}

module.exports = {
  baseUrl: "",
  outputDir: "app",
  assetsDir: "static",
  pages: generatePages(),
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    sourceMap: isDev
  },
  configureWebpack: config => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": resolve("src"),
          utils: resolve("src/utils"),
          components: resolve("src/components"),
          assets: resolve("src/assets")
        },
        extensions: [".js", ".vue", ".json"]
      },
      externals: {
        mui: "window.mui",
        mtool: "window.MTOOL",
        mAlloyCrop: "window.mAlloyCrop"
      }
    });
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 9000,
    https: false,
    hotOnly: false,
    open: false,
    contentBase: resolve("app")
  }
};
