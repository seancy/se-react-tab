
var Merge = require('webpack-merge');
var commonConfig = require('./webpack.config.js');


module.exports = Merge.smart(commonConfig, {
    devtool: 'source-map',

});
