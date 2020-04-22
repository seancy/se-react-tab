
var Merge = require('webpack-merge');
var commonConfig = require('./webpack.config.js');
const path = require('path')

module.exports = Merge.smart(commonConfig, {
    entry: {
        component:'./src/component.js'
    },
});
