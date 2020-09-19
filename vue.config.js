module.exports = {
  publicPath: "./",

  configureWebpack: {
    externals: {
      AMap: "AMap" // 高德地图配置
    }
  }
};
