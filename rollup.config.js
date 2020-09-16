import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

import path from "path";
import alias from "@rollup/plugin-alias";
import del from "rollup-plugin-delete";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import babel from "@rollup/plugin-babel";
import visualizer from "rollup-plugin-visualizer";
import browsersync from "rollup-plugin-browsersync";

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
			// enable run-time checks when not in production
			dev: !production,
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
		}),

		// Convert CommonJS modules to ES6
		commonjs(),

		// Process TS
		typescript({ 
			sourceMap: !production
		}),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && browsersync({
			open: false,
			server: "public",
			port: 5000
		}),

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
