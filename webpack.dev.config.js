
var Merge = require('webpack-merge');
var commonConfig = require('./webpack.config.js');
const path = require('path')

module.exports = Merge.smart(commonConfig, {
    devtool: 'source-map',
    devServer:{
        host: '0.0.0.0',
        port: 8085,
        contentBase: path.join(__dirname, 'dist'),
        watchOptions: {
            hot: true,
            watchContentBase: true,
            poll: true
        }
    },
});
