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

## Credit

This loader is based almost entirely on [worker-loader](https://github.com/webpack/worker-loader) by [@sokra](https://github.com/sokra).

## License

MIT (http://markdalgleish.mit-license.org)
