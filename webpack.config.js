'use strict'

const webpack = require('webpack'),
    path = require('path');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    env = process.env.WEBPACK_ENV,
    libraryName = 'Passable',
    plugins = [];

let outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
    outputFile = `${libraryName}.min.js`;
} else {
    outputFile = `${libraryName}.js`;
}

const config = {
    entry: `${__dirname}/src/Passable.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}/lib`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?presets[]=es2015'
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        alias: {
            root: path.resolve('./src')
        }
    },
    plugins
};

module.exports = config;