import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from "rollup-plugin-livereload";
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

import path from "path";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import visualizer from "rollup-plugin-visualizer";
import del from "rollup-plugin-delete";

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: "src/main.ts",
	output: {
		sourcemap: !production,
		format: "esm",
		name: "app",
		dir: "public/build"
	},
	plugins: [
		// Clean output dir
		del({ targets: "public/build/*" }),

		// Import aliases for files other than .ts
		alias({
			entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
			customResolver: resolve({ extensions: [".svelte", ".svg", ".scss"] })
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"]
		}),

		// Compile Svelte components
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
			},

			// Processes SCSS embedded within Svelte files
			preprocess: sveltePreprocess({
				scss: {
					includePaths: ["./src/scss"],
					sourceMap: !production
				}
			}),

			// Emit CSS for scss plugin to bundle
			emitCss: true
		}),

		// Processes SCSS imported from other JS files and plugins
		scss({
			output: "public/build/bundle.css",
			outputStyle: production ? "compressed" : "",
			sourceMap: !production,
			processor: css => postcss([autoprefixer])
				.process(css, { from: undefined })
				.then(result => result.css)
		}),

		// Convert CommonJS modules to ES6
		commonjs(),

		// Process TS
		typescript({ 
			sourceMap: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// Transpile
		production && babel({
			extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".svelte"],
			babelHelpers: "runtime",
			presets: [["@babel/preset-env"]],
			plugins: ["@babel/plugin-transform-runtime"]
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),

		// Bundle statistics
		visualizer()
	],
	watch: {
		clearScreen: false
	}
};
