import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import svelte from "rollup-plugin-svelte";
import autoPreprocess from 'svelte-preprocess';
import { readFileSync } from 'fs';
import replace from '@rollup/plugin-replace';

const packageJson = JSON.parse(readFileSync('package.json'))

const TEST_VAULT = `test-vault/.obsidian/plugins/${packageJson.name}`;

// Make sure not to forget the quotes as we're replacing a variable with a string not the value of the string
const environment = process.env.NODE_ENV === 'production' ? '"production"' : '"development"'

export default {
  input: 'src/main.ts',
  output: [
    {
    dir: 'dist/',
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default'
  },
  {
    dir: TEST_VAULT,
    sourcemap: 'inline',
    format: 'cjs',
    exports: 'default'
  }
  ],
  external: ['obsidian'],
  plugins: [
    replace({
      'process.env.NODE_ENV': environment,
    }),
    typescript(),
    nodeResolve({ browser: true }),
    commonjs(),
    svelte({
      preprocess: autoPreprocess()
    }),
    copy({
      targets: [
        // { src: 'dist/main.js', dest: TEST_VAULT },
        { src: ['manifest.json', 'src/styles.css'], dest: TEST_VAULT }
      ], flatten: true
    })
  ]
};