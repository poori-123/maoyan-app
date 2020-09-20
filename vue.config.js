module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://m.maoyan.com/ajax',
          changeOrigin: true,
          pathRewrite: {
            '/api': '/'
          }
        }
      }
    }
  }