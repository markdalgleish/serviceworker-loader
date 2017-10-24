import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const external = [].concat(
	['path'],
	Object.keys(pkg.dependencies),
	Object.keys(pkg.peerDependencies)
);

export default {
	input:    'src/index.js',
	plugins:  [
		resolve(),
		commonjs(),
		json({
			preferConst: true
		}),
		babel(Object.assign({
			babelrc: false,
			exclude: 'node_modules/**'
		}, pkg.babel, {
			presets: Object.assign(pkg.babel.presets, [
				["env", {
					modules: false
				}]
			])
		}))
	],
	external: (id) => external.some(_ =>
		_ == id || id.indexOf(`${_}/`) == 0
	),
	output:   [{
		file:      pkg.main,
		format:    'cjs',
		sourcemap: true
	}]
};
