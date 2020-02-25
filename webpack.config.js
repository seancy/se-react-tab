
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index:'./src/index.js',
        component:'./src/component.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].js',
        //path: path.resolve(__dirname, 'dist/public'),
        //publicPath:'/public/'
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|build)/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test: /(.scss|.css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ]
    },

    plugins:[
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({template:'./src/index.html'})
    ]
}
