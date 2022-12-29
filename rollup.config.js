import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'thisisfine.js',
  output: {
    file: 'thisisfine.dist.js',
    format: 'es'
  },
  plugins: [resolve(), terser()]
};