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

### Options

You can pass the name of the serviceworker file as a parameter with `filename`

```javascript
var registerServiceWorker = require("serviceworker?filename=anotherserviceworker.js!./sw.js");
```

By default it adds a hash to the filename so every build it would create a different file. E.g. Would create a file 45fb4c9e6f1e0bd99735.serviceworker.js
You can remove that has option with the parameter `nohash`.

```javascript
var registerServiceWorker = require("serviceworker?nohash!./sw.js");
```

## Credit

This loader is based almost entirely on [worker-loader](https://github.com/webpack/worker-loader) by [@sokra](https://github.com/sokra).

## License

MIT (http://markdalgleish.mit-license.org)
