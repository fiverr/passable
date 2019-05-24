const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { version } = require('../package.json');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'passable.min': './src/index.js',
        'passable': './src/index.js'
    },
    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        library: 'passable',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: "Function('return this')()"
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.join(process.cwd(), 'src'),
                path.join(process.cwd(), 'node_modules', 'proxy-polyfill')
            ],
            use: {
                loader: 'babel-loader',
                options: require('./babel.config')()
            }
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            PASSABLE_VERSION: JSON.stringify(version)
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: true,
            include: /\.min\.js$/
        })]
    }
};