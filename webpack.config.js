const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};