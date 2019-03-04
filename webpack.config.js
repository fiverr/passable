const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'passable.min': './src/index.js',
        'passable': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'Passable',
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: "Function('return this')()"
    },
    module: {
        rules: [{
            test: /\.js$/,
            include: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'node_modules', 'proxy-polyfill'),
            ],
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            sourceMap: true,
            include: /\.min\.js$/
        })]
    }
};