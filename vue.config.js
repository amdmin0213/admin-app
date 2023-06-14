// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer:{
//     proxy: "https://learn.myllama.co/webservice/rest/server.php",
//   }
// })
module.exports = {
  devServer: {
    proxy: 'https://learn.myllama.co/'
  }
}
