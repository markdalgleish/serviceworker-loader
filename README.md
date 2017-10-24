# service-worker-loader

[![NPM version](https://img.shields.io/npm/v/service-worker-loader.svg)](https://www.npmjs.com/package/service-worker-loader)
[![Dependency Status](https://img.shields.io/david/mohsen1/service-worker-loader.svg)](https://david-dm.org/mohsen1/service-worker-loader)
[![devDependency Status](https://img.shields.io/david/dev/mohsen1/service-worker-loader.svg)](https://david-dm.org/mohsen1/service-worker-loader#info=peerDependencies)
[![devDependency Status](https://img.shields.io/david/dev/mohsen1/service-worker-loader.svg)](https://david-dm.org/mohsen1/service-worker-loader#info=devDependencies)

Modern ServiceWorker loader for Webpack.

## Install

```sh
npm install --save-dev service-worker-loader
```
or
```sh
yarn add -D service-worker-loader
```

## [Usage](https://webpack.js.org/concepts/loaders)

```js
import registerServiceWorker, { ServiceWorkerNoSupportError } from 'service-worker!./sw';

registerServiceWorker({ scope: '/' }).then(() => {
	console.log('Success!');
}).catch((err) => {
	
	if (err instanceof ServiceWorkerNoSupportError) {
		console.log('ServiceWorker is not supported.');
	} else {
		console.log('Error!');
	}
});
```

### Options

#### `filename`
Defaults to `"[hash].[name].js"`. Specify the file name for generated Service Worker file

#### `publicPath`
Defaults to `"/"`. Overrides default `publicPath`. 

#### `outputPath`
Overrides output path for all ServiceWorkers.

## Credit

This loader is based almost entirely on [worker-loader](https://github.com/webpack/worker-loader) by [@sokra](https://github.com/sokra).

## License

MIT
