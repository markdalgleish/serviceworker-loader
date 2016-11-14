# ServiceWorker loader for Webpack

> A fork of [serviceworker-loader](https://github.com/markdalgleish/serviceworker-loader) that is actively maintained.

```bash
$ npm install --save-dev service-worker-loader
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```javascript
var registerServiceWorker = require("service-worker!./sw.js");

registerServiceWorker({ scope: '/' }).then(success, error);
```

### Options

#### `filename`
Defaults to `"[hash].serviceworker.js"`. Specify the file name for generated Service Worker file

#### `publicPath`
Overrides default `publicPath`. This in conjunction with [`CopyPlugin`](https://www.npmjs.com/package/copy-webpack-plugin) lets you serve the Service Worker file from root.

## Credit

This loader is based almost entirely on [worker-loader](https://github.com/webpack/worker-loader) by [@sokra](https://github.com/sokra).

## License

MIT (http://markdalgleish.mit-license.org)
