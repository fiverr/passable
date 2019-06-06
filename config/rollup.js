import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
const { version } = require('../package.json');

const output = {
    name: 'passable',
    format: 'umd'
};

const plugins = [
    resolve(),
    babel({
        babelrc: false,
        ...require('./babel.config')()
    }),
    replace({
        PASSABLE_VERSION: JSON.stringify(version)
    })
];

export default [{
    input: 'src/index.js',
    output: {
        file: 'dist/passable.js',
        ...output
    },
    plugins
},
{
    input: 'src/index.js',
    output: {
        file: 'dist/passable.min.js',
        ...output
    },
    plugins: [
        ...plugins,
        terser()
    ]
}];