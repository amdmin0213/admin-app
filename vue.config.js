// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
module.exports = {
  devServer: {
    proxy: 'https://learn.myllama.co/'
  }
}
