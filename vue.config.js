"use strict";
const path = require("path");
const defaultSettings = require("./src/settings.js");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack"); //引入jq
function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = defaultSettings.title || "gxhy";
// const port = process.env.port || process.env.npm_config_port || 18089 // dev port
//const port = process.env.port || process.env.npm_config_port || 18089 // dev port ghn-----------为了测试图片上传与陈的端口号保持一致
//const port = process.env.port || process.env.npm_config_port || 18081 // dev port ghn-----------为了测试雷达图片上传与李的端口号保持一致
const port = process.env.port || process.env.npm_config_port || 8008; // dev port ghn-----------为了测试雷达图片上传与陈的端口号保持一致

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  // lintOnSave: process.env.NODE_ENV === 'development',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/dev-api": {
        target: `http://127.0.0.1:${port}/mock`,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/dev-api": ""
        }
      },
      "/prod": {
        // target: `http://47.112.159.173:18088/`,
        // target: `http://192.168.1.103:8008/`, //付龙
        // target: `http://47.107.44.149:8008`, //付龙
        target: `http://47.107.44.149:8008/`, //线上
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/prod": ""
        }
      },
      "/yunw": {
        //添加通知公告本地图片上传地址
        // target: `http://192.168.1.107:8008/`, //付龙
        // target: `http://192.168.1.103:8008`, //付龙
        target: `http://47.107.44.149:8008/`, //线上
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/yunw": ""
        }
      },
      "/wuming": {
        //添加通知公告本地图片上传地址
        // target: `http://192.168.1.130:8008`, //吴明
        target: `http://47.107.44.149:8008/`, //线上
        // target: `http://192.168.1.103:8008`, //付龙
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/wuming": ""
        }
      },
      "/lixianzhao": {
        //添加通知公告本地图片上传地址
        // target: `http://192.168.1.122:8008`, //lixianzhao
        // target: `http://192.168.1.103:8008`, //付龙
        target: `http://47.107.44.149:8008/`, //线上

        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/lixianzhao": ""
        }
      }

    },
    after: require("./mock/mock-server.js")
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
        kriging: resolve("src/extjs/kriging.js")
      }
    },
    plugins: [
      // new CopyWebpackPlugin([
      //   {
      //     from:
      //       "node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml"
      //   },
      //   {
      //     from:
      //       "node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf"
      //   },
      //   {
      //     from:
      //       "node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js",
      //     to: "js/"
      //   }
      // ]),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  chainWebpack(config) {
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        "window.Quill": "quill"
      }
    ]); //ghn-添加富文本编辑框的图片拉伸功能
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    config.module
      .rule("svgIcon")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader") // 一定要添加use
      .loader("svg-sprite-loader")
      .tap(options => {
        options = {
          symbolId: "icon-[name]"
        };
        return options;
      });

    // 原有的svg图像处理loader添加exclude
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.resolve.alias.set("static", resolve("static"));
    //对图片处理  url-loder
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 2000, esModule: false })) // 配置线上图片转base64。 app 已有做浏览器缓存。转换过大，会加大首屏加载时长
      .end();
    // config.module
    //   .rule('svg')
    //   .exclude.add(resolve('src/icons'))
    //   .end()

    // config.module
    //   .rule('icons')
    //   .test(/\.svg$/)
    //   .include.add(resolve('src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: 'icon-[name]'
    //   })
    //   .end()
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-source-addvcd")
    );

    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");
    });
  }
};
