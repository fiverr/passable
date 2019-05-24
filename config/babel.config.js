module.exports = (api) => {

    if (api) {
        api.cache(true);
    }

    const presets = [
        '@babel/preset-flow',
        '@babel/preset-env'
    ];

    const plugins = [
        '@babel/plugin-transform-flow-strip-types',
        ['webpack-aliases', {
            'config': './config/webpack.js'
        }],
        'babel-plugin-add-module-exports',
        '@babel/plugin-proposal-class-properties'
    ];

    return {
        presets,
        plugins
    };
};