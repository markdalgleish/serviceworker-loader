[![View project on npm](https://img.shields.io/npm/v/serviceworker-loader.svg?style=flat)](https://npmjs.org/package/serviceworker-loader)

# ServiceWorker loader for Webpack

```bash
$ npm install --save-dev serviceworker-loader
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

```javascript
var registerServiceWorker = require("serviceworker!./sw.js");

registerServiceWorker({ scope: '/' }).then(success, error);
```

## Credit

This loader is based almost entirely on [worker-loader](https://github.com/webpack/worker-loader) by [@sokra](https://github.com/sokra).

## License

MIT (http://markdalgleish.mit-license.org)
