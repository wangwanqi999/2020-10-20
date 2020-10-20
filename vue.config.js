module.exports = {
  devServer: {
    open: true,
  },
  // 配置 px 转 rem 的
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // rem 的单位  填设计稿的 1/10
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
}
