const ENV = process.env.NODE_ENV;

module.exports = {
  publicPath: ENV === "development" ? "" : "./dist/",

  configureWebpack: {
    externals: {
      AMap: "AMap" // 高德地图配置
    }
  }
};
