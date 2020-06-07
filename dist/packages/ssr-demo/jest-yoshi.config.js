"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('./environment'),
    emitConfigs = _require.emitConfigs,
    bootstrapServer = _require.bootstrapServer; // The purpose of this file is to start your server and possibly additional servers
// like RPC/Petri servers.
//
// Because tests are running in parallel, it should start a different server on a different port
// for every test file (E2E and server tests).
//
// By attaching the server object (testkit result) on `globalObject` it will be available to every
// test file globally by that name.


module.exports = {
  bootstrap: {
    setup: function () {
      var _setup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var globalObject;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                globalObject = _ref.globalObject;
                _context.next = 3;
                return emitConfigs();

              case 3:
                globalObject.app = bootstrapServer();
                _context.next = 6;
                return globalObject.app.start();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function setup(_x) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }(),
    teardown: function () {
      var _teardown = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var globalObject;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                globalObject = _ref2.globalObject;
                _context2.next = 3;
                return globalObject.app.stop();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function teardown(_x2) {
        return _teardown.apply(this, arguments);
      }

      return teardown;
    }()
  },
  puppeteer: {
    // launch options: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
    // debugging tips: https://github.com/GoogleChrome/puppeteer#debugging-tips
    devtools: false
  }
};