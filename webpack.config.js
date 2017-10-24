'use strict';

const webpack = require('webpack'),
    path = require('path');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    env = process.env.WEBPACK_ENV,
    libraryName = 'Passable',
    plugins = [];

let outputFile,
    outputDir;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
    outputFile = `${libraryName}.min.js`;
    outputDir = 'dist';
} else {
    outputFile = `${libraryName}.js`;
    outputDir = 'dev';
}

const config = {
    entry: `${__dirname}/src/Passable.js`,
    devtool: 'source-map',
    output: {
        path: `${__dirname}/${outputDir}`,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /(node_modules)/
        }]
    },
    resolve: {
        alias: {
            Root: path.resolve('./src'),
            Helpers: path.resolve('./src/helpers')
        }
    },
    plugins
};

module.exports = config;