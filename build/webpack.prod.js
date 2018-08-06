const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const PreloadPlugin = require('preload-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const _url = path.join(__dirname, '../dist');

const { prod } = require('../config');
const base = require('./webpack.base');

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: 'js/[name].js',
        path: _url,
        publicPath: prod.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader'},
                        {
                            loader: 'postcss-loader',
                            options: {
                              ident: 'postcss',
                              plugins: (loader) => [
                                require('postcss-import')(),
                                require('postcss-cssnext')(),
                                require('cssnano')()
                              ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 50000,
                            outputPath: 'images',
                            publicPath: prod.imgPublibPath
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanPlugin([ 'dist' ], {
            root: path.resolve(__dirname, '../')
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: prod.env
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].css'
        }),
        new UglifyJSPlugin()
    ]
})