const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8081,
    proxy: {
      "^/analysis": {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
    }
  },
  transpileDependencies: true,
  outputDir: "../backend/src/main/resources/templates/vue",
  assetsDir: "static",
})