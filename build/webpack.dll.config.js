const path = require("path");
const webpack = require("webpack");
//读取package.json里的依赖，normalize.css除外，打包会报错
const package = require('../package.json');
let dependencies = Object.keys(package.dlldependencies) || [];
//如果使用了chrome的vue-devtool，那打包的时候把vue也排除掉，因为压缩过的vue是不能使用vue-devtool的
dependencies = dependencies.length > 0 ? dependencies.filter(item => item !== 'vue') : [];
 
module.exports = {
  devtool: 'source-map',
  entry: {
    vendor: dependencies // "vendor"这个名字是自己定义的
  },
  output: {
    path: path.join(__dirname, "../common/js"), // 输出的文件放在common/js中
    filename: "[name].js", // 其中[name]就是entry中的vendor，因此filename就是vendor.js
    library: "[name]" // vendor.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, ".", "[name]-manifest.json"), // DllReferencePlugin使用该json文件来做映射依赖性。（这个文件会告诉我们的哪些文件已经提取打包好了）
      name: "[name]",  //  暴露出的dll的函数名；此处需要和 output.library 的值一致
      context: __dirname 
    }),
    // new webpack.optimize.UglifyJsPlugin({ // 压缩
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};