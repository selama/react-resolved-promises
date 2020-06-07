"use strict";

// https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-testkit
var testkit = require('@wix/wix-bootstrap-testkit'); // https://github.com/wix-platform/wix-node-platform/tree/master/config/wix-config-emitter


var configEmitter = require('@wix/wix-config-emitter'); // take erb configurations from source folder, replace values/functions,
// remove the ".erb" extension and emit files inside the target folder


module.exports.emitConfigs = function () {
  return configEmitter().val('scripts_domain', 'static.parastorage.com').emit();
}; // start the server as an embedded app


module.exports.bootstrapServer = function () {
  return testkit.app('./index', {
    env: process.env
  });
};