# serviceworker-loader

[![NPM version][npm]][npm-url]
[![Node version][node]][node-url]
[![Peer dependency status][peer-deps]][peer-deps-url]
[![Dependency status][deps]][deps-url]

[npm]: https://img.shields.io/npm/v/serviceworker-loader.svg
[npm-url]: https://www.npmjs.com/package/serviceworker-loader

[node]: https://img.shields.io/node/v/serviceworker-loader.svg
[node-url]: https://nodejs.org

[peer-deps]: https://img.shields.io/david/peer/markdalgleish/serviceworker-loader.svg
[peer-deps-url]: https://david-dm.org/markdalgleish/serviceworker-loader?type=peer

[deps]: https://img.shields.io/david/markdalgleish/serviceworker-loader.svg
[deps-url]: https://david-dm.org/markdalgleish/serviceworker-loader

Modern ServiceWorker loader for [Webpack](https://webpack.js.org).

## Install

```sh
npm i -D serviceworker-loader
# or
yarn add -D serviceworker-loader
```

## [Usage](https://webpack.js.org/concepts/loaders)

```js
import registerServiceWorker, { ServiceWorkerNoSupportError } from 'serviceworker!./sw';

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

---
[![NPM](https://nodei.co/npm/serviceworker-loader.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/serviceworker-loader/)
