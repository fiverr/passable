module.exports = (api) => {

    if (api) {
        api.cache(true);
    }

    const presets = [
        '@babel/preset-env'
    ];

    const plugins = [
        'babel-plugin-add-module-exports',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-object-assign'
    ];

    return {
        include: [/src/, /node_modules/],
        presets,
        plugins
    };
};
