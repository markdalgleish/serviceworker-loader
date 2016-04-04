var WebWorkerTemplatePlugin = require("webpack/lib/webworker/WebWorkerTemplatePlugin");
var SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin");
var path = require("path");

var loaderUtils = require("loader-utils");
module.exports = function() {};
module.exports.pitch = function(request) {
  if(!this.webpack) throw new Error("Only usable with webpack");
  var callback = this.async();
  var query = loaderUtils.parseQuery(this.query);
  var outputOptions = {
    filename: "[hash].serviceworker.js",
    chunkFilename: "[id].[hash].serviceworker.js",
    namedChunkFilename: null
  };
  var options = this.options && (this.options.serviceworker || this.options.worker);
  if(options && options.output) {
    for(var name in options.output) {
      outputOptions[name] = options.output[name];
    }
  }
  var workerCompiler = this._compilation.createChildCompiler("serviceworker", outputOptions);
  workerCompiler.apply(new WebWorkerTemplatePlugin(outputOptions));
  workerCompiler.apply(new SingleEntryPlugin(this.context, "!!" + request, "main"));
  if(options && options.plugins) {
    options.plugins.forEach(function(plugin) {
      workerCompiler.apply(plugin);
    });
  }
  var subCache = "subcache " + __dirname + " " + request;
  workerCompiler.plugin("compilation", function(compilation) {
    if(compilation.cache) {
      if(!compilation.cache[subCache])
        compilation.cache[subCache] = {};
      compilation.cache = compilation.cache[subCache];
    }
  });
  workerCompiler.runAsChild(function(err, entries, compilation) {
    if(err) return callback(err);
    var workerFile = entries[0].files[0];
    return callback(null, "module.exports = function(options) {\n\treturn navigator.serviceWorker.register(__webpack_public_path__ + " + JSON.stringify(workerFile) + ", options);\n};");
  });
}
