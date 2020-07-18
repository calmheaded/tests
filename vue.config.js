let env = process.env.NODE_ENV;
// console.log(env, 'env') 
// console.log(process.env.VUE_APP_TITLE, 'VUE_APP_TITLE')
//  splitchuank 插件    mini-css-extract-plugin 插件 

// let path = require('path') //引入node的path模块
// 看到项目各模块的大小，可以按需优化
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: 'development',
  //*?Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径
  publicPath: '/production-sub-path/',
  outputDir: 'dist', //修改打包文件所在的目录名称 
  assetsDir: '', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  indexPath: 'index.html', //指定生成的 index.html的名称
  //*？ entry: './src/main.js'//打包的入口文件 和从0搭建的进行对比一下 发现错误在哪
  // filename: 'test.html'  //同上c
  // title: "title"//同
  // boolean | 'warning' | 'default' | 'error'
  lintOnSave: false, //是否开启eslint检查
  productionSourceMap: false, //是否需要生产环境的 source map 
  runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本 vue.runtime.esm.js true是vue.esm.js
  // 使用插件第一种方式  问题是本地没有生成stats.json 报告
  // configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin({
  //       analyzerMode: 'server',
  //       analyzerHost: '127.0.0.1',
  //       analyzerPort: 8886,
  //       reportFilename: 'report.html',
  //       defaultSizes: 'parsed',
  //       openAnalyzer: true,
  //       generateStatsFile: true,
  //       statsFilename: 'stats.json',
  //       statsOptions: null,
  //       logLevel: 'info'
  //     }),
  //   ]
  // },
  // 链式调用方式 参数:need to do test reportFilename参数
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('BundleAnalyzerPlugin')
        .use(BundleAnalyzerPlugin)
        .tap(() => [{
          analyzerMode: 'server',
          analyzerHost: '127.0.0.1',
          analyzerPort: 8881,
          reportFilename: 'report.html',
          defaultSizes: 'parsed',
          openAnalyzer: false,
          generateStatsFile: true,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info'
        }])
    }

  },
  devServer: {
    // contentBase: './aday', //配置开发服务器运行时的文件根目录
    port: '8070', //配置端口号
    // compress: true, // 服务器压缩
    open: true, // 自动打开浏览器
    // hot: false //热更新
    // progress: true, //编译的进度条
    // 配置跨域
    proxy: {
      '/workshop/list': {
        target: 'https://www.easy-mock.com/mock/5b4590d46039fe6f1bc80f13/portal', //接口域名地址
        changeOrigin: true, //是否需要托管站点 
        pathRewrite: { //是否重定向
          '^/workshop/list': '/workshop/list'
        }
      }

    }
  }




  // configureWebpack: config => {
  //   // if (process.env.NODE_ENV === 'production') {
  //   //   // console.log(config, '1')
  //   //   // 为生产环境修改配置...
  //   // } else {
  //   //   // console.log(11111111111, '2')
  //   //   // 为开发环境修改配置...
  //   // }

  // }
}
