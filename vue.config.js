module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://m.maoyan.com',
          changeOrigin: true,
          pathRewrite: {
            '/api': '/'
          }
        },
      }
    }
  }