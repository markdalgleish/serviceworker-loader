import path from 'path';
import loaderUtils from 'loader-utils';
import validateOptions from 'schema-utils';
import SingleEntryPlugin from 'webpack/lib/SingleEntryPlugin';
import WebWorkerTemplatePlugin from 'webpack/lib/webworker/WebWorkerTemplatePlugin';
import getServiceWorker from './serviceworker';
import LoaderError from './loader-error';
import schema from './options.json';

export default function loader() {
}

loader.pitch =
function pitch(request) {

	const options = loaderUtils.getOptions(this) || {};

	validateOptions(schema, options, 'ServiceWorker Loader');

	if (!this.webpack) {
		throw new LoaderError({
			name:    'ServiceWorker Loader',
			message: 'This loader is only usable with webpack'
		});
	}

	this.cacheable(false);

	const cb = this.async();

	const filename = loaderUtils.interpolateName(this, options.filename || '[hash].[name].js', {
		context: options.context || this.options.context,
		regExp:  options.regExp
	});

	const publicPath = options.publicPath || '/';

	const outputOptions = {
		filename,
		chunkFilename:      `[id].${filename}`,
		namedChunkFilename: null
	};

	// TODO remove and triage eventual replacement via an option if needed
	// doesn't work with webpack > v2.0.0
	if (this.options && this.options.worker && this.options.worker.output) {
		Object.keys(this.options.worker.output).forEach((name) => {
			outputOptions[name] = this.options.worker.output[name];
		});
	}

	const compiler = this._compilation.createChildCompiler('service-worker', outputOptions);

	compiler.apply(new WebWorkerTemplatePlugin(outputOptions));
	compiler.apply(new SingleEntryPlugin(this.context, `!!${request}`, 'main'));

	// TODO remove and triage eventual replacement via an option if needed
	// doesn't work with webpack > v2.0.0
	if (this.options && this.options.worker && this.options.worker.plugins) {
		this.options.worker.plugins.forEach(plugin =>
			compiler.apply(plugin)
		);
	}

	const subCache = `subcache ${__dirname} ${request}`;

	compiler.plugin('compilation', (compilation) => {

		if (compilation.cache) {

			if (!compilation.cache[subCache]) {
				compilation.cache[subCache] = {};
			}

			compilation.cache = compilation.cache[subCache];
		}
	});

	const rootCompiler = this._compiler,
		fs = rootCompiler.outputFileSystem;

	compiler.runAsChild((err, entries) => {

		if (err) {
			return cb(err);
		}

		if (entries[0]) {

			const file = entries[0].files[0];

			if (options.outputPath) {

				rootCompiler.plugin('after-emit', (compilation, callback) => {

					const asset = compilation.assets[file];

					fs.unlink(asset.existsAt, (err) => {

						if (err) {
							return callback(err);
						}

						return fs.writeFile(path.join(options.outputPath, file), asset.source(), 'utf8', err =>
							callback(err)
						);
					});
				});
			}

			const code = getServiceWorker(
				JSON.stringify(publicPath) || '__webpack_public_path__',
				JSON.stringify(file)
			);

			return cb(null, code);
		}

		return cb(null, null);
	});
};
