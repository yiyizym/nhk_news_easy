const path = require('path');

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
    }
};