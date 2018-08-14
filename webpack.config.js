const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    mode: process.env.WEBPACK_MODE || 'development',
    // mode: 'development',
    entry: './src/js/index.js',
    resolve: {
        alias: {
            // vue: 'vue/dist/vue.min.js'
            vue: 'vue/dist/vue.js'
        }
    },
    devServer: {
      contentBase: './docs',
      hot: true
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        }]
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[hash].bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'nhk_news_easy',
        template: 'src/tpl/index.html'
      }),
      new CleanWebpackPlugin(['docs']),
      new webpack.HotModuleReplacementPlugin()
    ]
};