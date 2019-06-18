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
        'babel-plugin-add-module-exports',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-object-assign'
    ];

    return {
        presets,
        plugins
    };
};