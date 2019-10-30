import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
const { version } = require('../package.json');

const DEFAULT_FORMAT = 'umd';
const LIBRARY_NAME = 'passable';

const PLUGINS = [
    resolve(),
    commonjs({
        include: /node_modules\/(anyone|n4s)/
    }),
    babel({
        babelrc: false,
        ...require('./babel.config')()
    }),
    replace({
        PASSABLE_VERSION: JSON.stringify(version)
    })
];

const buildConfig = ({ format = DEFAULT_FORMAT, min = false } = {}) => ({
    input: 'src/index.js',
    output: {
        file: [
            `dist/${LIBRARY_NAME}`,
            min && 'min',
            format !== DEFAULT_FORMAT && format,
            'js'
        ].filter(Boolean).join('.'),
        name: LIBRARY_NAME,
        format
    },
    plugins: min
        ? [ ...PLUGINS, terser() ]
        : PLUGINS

});

export default [
    buildConfig({ min: true }),
    buildConfig()
];
