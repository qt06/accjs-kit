import minimist from 'minimist';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';

var argv = minimist(process.argv.slice(2));
var minify = argv['config:minify'];

export default {
  input: 'src/acc-entry.js',
  output: {
    file: minify ? 'dist/accjs-kit.min.js' : 'dist/accjs-kit.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    json(),
    minify ? terser() : {}
  ]
};
