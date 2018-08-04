const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: process.env.WEBPACK_MODE || 'development',
    // mode: 'development',
    entry: './src/index.js',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    serve: {
      content: './docs'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[contenthash].bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'nhk_news_easy',
        template: 'src/index.html'
      })
    ]
};