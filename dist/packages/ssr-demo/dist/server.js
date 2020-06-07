"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Don't pollute Jest/Mocha by installing `source-map-support`
if (process.env.NODE_ENV !== 'test') {
  try {
    require('source-map-support').install();
  } catch (e) {
    console.error('Cannot find "source-map-support", stack traces may appear without source maps.');
    console.error('Run `npm i --save source-map-support` to have better stack traces');
  }
}

(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();else if (typeof define === 'function' && define.amd) define([], factory);else {
    var a = factory();

    for (var i in a) {
      (typeof exports === 'object' ? exports : root)[i] = a[i];
    }
  }
})(typeof self !== 'undefined' ? self : void 0, function () {
  return function (val) {
    return val["default"] || val;
  }(
  /******/
  function (modules) {
    // webpackBootstrap

    /******/
    // eslint-disable-next-line no-unused-vars

    /******/
    function hotDownloadUpdateChunk(chunkId) {
      /******/
      var chunk = require("./" + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
      /******/


      hotAddUpdateChunk(chunk.id, chunk.modules);
      /******/
    }
    /******/

    /******/
    // eslint-disable-next-line no-unused-vars

    /******/


    function hotDownloadManifest() {
      /******/
      try {
        /******/
        var update = require("./" + "updates/" + hotCurrentHash + ".hot-update.json");
        /******/

      } catch (e) {
        /******/
        return Promise.resolve();
        /******/
      }
      /******/


      return Promise.resolve(update);
      /******/
    }
    /******/

    /******/
    //eslint-disable-next-line no-unused-vars

    /******/


    function hotDisposeChunk(chunkId) {
      /******/
      delete installedChunks[chunkId];
      /******/
    }
    /******/

    /******/


    var hotApplyOnUpdate = true;
    /******/
    // eslint-disable-next-line no-unused-vars

    /******/

    var hotCurrentHash = "dedcce97ba4e204a5786";
    /******/

    var hotRequestTimeout = 10000;
    /******/

    var hotCurrentModuleData = {};
    /******/

    var hotCurrentChildModule;
    /******/
    // eslint-disable-next-line no-unused-vars

    /******/

    var hotCurrentParents = [];
    /******/
    // eslint-disable-next-line no-unused-vars

    /******/

    var hotCurrentParentsTemp = [];
    /******/

    /******/
    // eslint-disable-next-line no-unused-vars

    /******/

    function hotCreateRequire(moduleId) {
      /******/
      var me = installedModules[moduleId];
      /******/

      if (!me) return __webpack_require__;
      /******/

      var fn = function fn(request) {
        /******/
        if (me.hot.active) {
          /******/
          if (installedModules[request]) {
            /******/
            if (installedModules[request].parents.indexOf(moduleId) === -1) {
              /******/
              installedModules[request].parents.push(moduleId);
              /******/
            }
            /******/

          } else {
            /******/
            hotCurrentParents = [moduleId];
            /******/

            hotCurrentChildModule = request;
            /******/
          }
          /******/


          if (me.children.indexOf(request) === -1) {
            /******/
            me.children.push(request);
            /******/
          }
          /******/

        } else {
          /******/
          console.warn(
          /******/
          "[HMR] unexpected require(" +
          /******/
          request +
          /******/
          ") from disposed module " +
          /******/
          moduleId
          /******/
          );
          /******/

          hotCurrentParents = [];
          /******/
        }
        /******/


        return __webpack_require__(request);
        /******/
      };
      /******/


      var ObjectFactory = function ObjectFactory(name) {
        /******/
        return {
          /******/
          configurable: true,

          /******/
          enumerable: true,

          /******/
          get: function get() {
            /******/
            return __webpack_require__[name];
            /******/
          },

          /******/
          set: function set(value) {
            /******/
            __webpack_require__[name] = value;
            /******/
          }
          /******/

        };
        /******/
      };
      /******/


      for (var name in __webpack_require__) {
        /******/
        if (
        /******/
        Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
        /******/
        name !== "e" &&
        /******/
        name !== "t"
        /******/
        ) {
            /******/
            Object.defineProperty(fn, name, ObjectFactory(name));
            /******/
          }
        /******/

      }
      /******/


      fn.e = function (chunkId) {
        /******/
        if (hotStatus === "ready") hotSetStatus("prepare");
        /******/

        hotChunksLoading++;
        /******/

        return __webpack_require__.e(chunkId).then(finishChunkLoading, function (err) {
          /******/
          finishChunkLoading();
          /******/

          throw err;
          /******/
        });
        /******/

        /******/

        function finishChunkLoading() {
          /******/
          hotChunksLoading--;
          /******/

          if (hotStatus === "prepare") {
            /******/
            if (!hotWaitingFilesMap[chunkId]) {
              /******/
              hotEnsureUpdateChunk(chunkId);
              /******/
            }
            /******/


            if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
              /******/
              hotUpdateDownloaded();
              /******/
            }
            /******/

          }
          /******/

        }
        /******/

      };
      /******/


      fn.t = function (value, mode) {
        /******/
        if (mode & 1) value = fn(value);
        /******/

        return __webpack_require__.t(value, mode & ~1);
        /******/
      };
      /******/


      return fn;
      /******/
    }
    /******/

    /******/
    // eslint-disable-next-line no-unused-vars

    /******/


    function hotCreateModule(moduleId) {
      /******/
      var hot = {
        /******/
        // private stuff

        /******/
        _acceptedDependencies: {},

        /******/
        _declinedDependencies: {},

        /******/
        _selfAccepted: false,

        /******/
        _selfDeclined: false,

        /******/
        _selfInvalidated: false,

        /******/
        _disposeHandlers: [],

        /******/
        _main: hotCurrentChildModule !== moduleId,

        /******/

        /******/
        // Module API

        /******/
        active: true,

        /******/
        accept: function accept(dep, callback) {
          /******/
          if (dep === undefined) hot._selfAccepted = true;
          /******/
          else if (typeof dep === "function") hot._selfAccepted = dep;
            /******/
            else if (typeof dep === "object")
                /******/
                for (var i = 0; i < dep.length; i++) {
                  /******/
                  hot._acceptedDependencies[dep[i]] = callback || function () {};
                }
                /******/
              else hot._acceptedDependencies[dep] = callback || function () {};
          /******/
        },

        /******/
        decline: function decline(dep) {
          /******/
          if (dep === undefined) hot._selfDeclined = true;
          /******/
          else if (typeof dep === "object")
              /******/
              for (var i = 0; i < dep.length; i++) {
                /******/
                hot._declinedDependencies[dep[i]] = true;
              }
              /******/
            else hot._declinedDependencies[dep] = true;
          /******/
        },

        /******/
        dispose: function dispose(callback) {
          /******/
          hot._disposeHandlers.push(callback);
          /******/

        },

        /******/
        addDisposeHandler: function addDisposeHandler(callback) {
          /******/
          hot._disposeHandlers.push(callback);
          /******/

        },

        /******/
        removeDisposeHandler: function removeDisposeHandler(callback) {
          /******/
          var idx = hot._disposeHandlers.indexOf(callback);
          /******/


          if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
          /******/
        },

        /******/
        invalidate: function invalidate() {
          /******/
          this._selfInvalidated = true;
          /******/

          switch (hotStatus) {
            /******/
            case "idle":
              /******/
              hotUpdate = {};
              /******/

              hotUpdate[moduleId] = modules[moduleId];
              /******/

              hotSetStatus("ready");
              /******/

              break;

            /******/

            case "ready":
              /******/
              hotApplyInvalidatedModule(moduleId);
              /******/

              break;

            /******/

            case "prepare":
            /******/

            case "check":
            /******/

            case "dispose":
            /******/

            case "apply":
              /******/
              (hotQueuedInvalidatedModules =
              /******/
              hotQueuedInvalidatedModules || []).push(moduleId);
              /******/

              break;

            /******/

            default:
              /******/
              // ignore requests in error states

              /******/
              break;

            /******/
          }
          /******/

        },

        /******/

        /******/
        // Management API

        /******/
        check: hotCheck,

        /******/
        apply: hotApply,

        /******/
        status: function status(l) {
          /******/
          if (!l) return hotStatus;
          /******/

          hotStatusHandlers.push(l);
          /******/
        },

        /******/
        addStatusHandler: function addStatusHandler(l) {
          /******/
          hotStatusHandlers.push(l);
          /******/
        },

        /******/
        removeStatusHandler: function removeStatusHandler(l) {
          /******/
          var idx = hotStatusHandlers.indexOf(l);
          /******/

          if (idx >= 0) hotStatusHandlers.splice(idx, 1);
          /******/
        },

        /******/

        /******/
        //inherit from previous dispose call

        /******/
        data: hotCurrentModuleData[moduleId]
        /******/

      };
      /******/

      hotCurrentChildModule = undefined;
      /******/

      return hot;
      /******/
    }
    /******/

    /******/


    var hotStatusHandlers = [];
    /******/

    var hotStatus = "idle";
    /******/

    /******/

    function hotSetStatus(newStatus) {
      /******/
      hotStatus = newStatus;
      /******/

      for (var i = 0; i < hotStatusHandlers.length; i++) {
        /******/
        hotStatusHandlers[i].call(null, newStatus);
      }
      /******/

    }
    /******/

    /******/
    // while downloading

    /******/


    var hotWaitingFiles = 0;
    /******/

    var hotChunksLoading = 0;
    /******/

    var hotWaitingFilesMap = {};
    /******/

    var hotRequestedFilesMap = {};
    /******/

    var hotAvailableFilesMap = {};
    /******/

    var hotDeferred;
    /******/

    /******/
    // The update info

    /******/

    var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
    /******/

    /******/

    function toModuleId(id) {
      /******/
      var isNumber = +id + "" === id;
      /******/

      return isNumber ? +id : id;
      /******/
    }
    /******/

    /******/


    function hotCheck(apply) {
      /******/
      if (hotStatus !== "idle") {
        /******/
        throw new Error("check() is only allowed in idle status");
        /******/
      }
      /******/


      hotApplyOnUpdate = apply;
      /******/

      hotSetStatus("check");
      /******/

      return hotDownloadManifest(hotRequestTimeout).then(function (update) {
        /******/
        if (!update) {
          /******/
          hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
          /******/

          return null;
          /******/
        }
        /******/


        hotRequestedFilesMap = {};
        /******/

        hotWaitingFilesMap = {};
        /******/

        hotAvailableFilesMap = update.c;
        /******/

        hotUpdateNewHash = update.h;
        /******/

        /******/

        hotSetStatus("prepare");
        /******/

        var promise = new Promise(function (resolve, reject) {
          /******/
          hotDeferred = {
            /******/
            resolve: resolve,

            /******/
            reject: reject
            /******/

          };
          /******/
        });
        /******/

        hotUpdate = {};
        /******/

        var chunkId = "server";
        /******/
        // eslint-disable-next-line no-lone-blocks

        /******/

        {
          /******/
          hotEnsureUpdateChunk(chunkId);
          /******/
        }
        /******/

        if (
        /******/
        hotStatus === "prepare" &&
        /******/
        hotChunksLoading === 0 &&
        /******/
        hotWaitingFiles === 0
        /******/
        ) {
            /******/
            hotUpdateDownloaded();
            /******/
          }
        /******/


        return promise;
        /******/
      });
      /******/
    }
    /******/

    /******/
    // eslint-disable-next-line no-unused-vars

    /******/


    function hotAddUpdateChunk(chunkId, moreModules) {
      /******/
      if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
        /******/
        return;
      /******/

      hotRequestedFilesMap[chunkId] = false;
      /******/

      for (var moduleId in moreModules) {
        /******/
        if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
          /******/
          hotUpdate[moduleId] = moreModules[moduleId];
          /******/
        }
        /******/

      }
      /******/


      if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
        /******/
        hotUpdateDownloaded();
        /******/
      }
      /******/

    }
    /******/

    /******/


    function hotEnsureUpdateChunk(chunkId) {
      /******/
      if (!hotAvailableFilesMap[chunkId]) {
        /******/
        hotWaitingFilesMap[chunkId] = true;
        /******/
      } else {
        /******/
        hotRequestedFilesMap[chunkId] = true;
        /******/

        hotWaitingFiles++;
        /******/

        hotDownloadUpdateChunk(chunkId);
        /******/
      }
      /******/

    }
    /******/

    /******/


    function hotUpdateDownloaded() {
      /******/
      hotSetStatus("ready");
      /******/

      var deferred = hotDeferred;
      /******/

      hotDeferred = null;
      /******/

      if (!deferred) return;
      /******/

      if (hotApplyOnUpdate) {
        /******/
        // Wrap deferred object in Promise to mark it as a well-handled Promise to

        /******/
        // avoid triggering uncaught exception warning in Chrome.

        /******/
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666

        /******/
        Promise.resolve()
        /******/
        .then(function () {
          /******/
          return hotApply(hotApplyOnUpdate);
          /******/
        })
        /******/
        .then(
        /******/
        function (result) {
          /******/
          deferred.resolve(result);
          /******/
        },
        /******/
        function (err) {
          /******/
          deferred.reject(err);
          /******/
        }
        /******/
        );
        /******/
      } else {
        /******/
        var outdatedModules = [];
        /******/

        for (var id in hotUpdate) {
          /******/
          if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
            /******/
            outdatedModules.push(toModuleId(id));
            /******/
          }
          /******/

        }
        /******/


        deferred.resolve(outdatedModules);
        /******/
      }
      /******/

    }
    /******/

    /******/


    function hotApply(options) {
      /******/
      if (hotStatus !== "ready")
        /******/
        throw new Error("apply() is only allowed in ready status");
      /******/

      options = options || {};
      /******/

      return hotApplyInternal(options);
      /******/
    }
    /******/

    /******/


    function hotApplyInternal(options) {
      /******/
      hotApplyInvalidatedModules();
      /******/

      /******/

      var cb;
      /******/

      var i;
      /******/

      var j;
      /******/

      var module;
      /******/

      var moduleId;
      /******/

      /******/

      function getAffectedStuff(updateModuleId) {
        /******/
        var outdatedModules = [updateModuleId];
        /******/

        var outdatedDependencies = {};
        /******/

        /******/

        var queue = outdatedModules.map(function (id) {
          /******/
          return {
            /******/
            chain: [id],

            /******/
            id: id
            /******/

          };
          /******/
        });
        /******/

        while (queue.length > 0) {
          /******/
          var queueItem = queue.pop();
          /******/

          var moduleId = queueItem.id;
          /******/

          var chain = queueItem.chain;
          /******/

          module = installedModules[moduleId];
          /******/

          if (
          /******/
          !module ||
          /******/
          module.hot._selfAccepted && !module.hot._selfInvalidated
          /******/
          )
            /******/
            continue;
          /******/

          if (module.hot._selfDeclined) {
            /******/
            return {
              /******/
              type: "self-declined",

              /******/
              chain: chain,

              /******/
              moduleId: moduleId
              /******/

            };
            /******/
          }
          /******/


          if (module.hot._main) {
            /******/
            return {
              /******/
              type: "unaccepted",

              /******/
              chain: chain,

              /******/
              moduleId: moduleId
              /******/

            };
            /******/
          }
          /******/


          for (var i = 0; i < module.parents.length; i++) {
            /******/
            var parentId = module.parents[i];
            /******/

            var parent = installedModules[parentId];
            /******/

            if (!parent) continue;
            /******/

            if (parent.hot._declinedDependencies[moduleId]) {
              /******/
              return {
                /******/
                type: "declined",

                /******/
                chain: chain.concat([parentId]),

                /******/
                moduleId: moduleId,

                /******/
                parentId: parentId
                /******/

              };
              /******/
            }
            /******/


            if (outdatedModules.indexOf(parentId) !== -1) continue;
            /******/

            if (parent.hot._acceptedDependencies[moduleId]) {
              /******/
              if (!outdatedDependencies[parentId])
                /******/
                outdatedDependencies[parentId] = [];
              /******/

              addAllToSet(outdatedDependencies[parentId], [moduleId]);
              /******/

              continue;
              /******/
            }
            /******/


            delete outdatedDependencies[parentId];
            /******/

            outdatedModules.push(parentId);
            /******/

            queue.push({
              /******/
              chain: chain.concat([parentId]),

              /******/
              id: parentId
              /******/

            });
            /******/
          }
          /******/

        }
        /******/

        /******/


        return {
          /******/
          type: "accepted",

          /******/
          moduleId: updateModuleId,

          /******/
          outdatedModules: outdatedModules,

          /******/
          outdatedDependencies: outdatedDependencies
          /******/

        };
        /******/
      }
      /******/

      /******/


      function addAllToSet(a, b) {
        /******/
        for (var i = 0; i < b.length; i++) {
          /******/
          var item = b[i];
          /******/

          if (a.indexOf(item) === -1) a.push(item);
          /******/
        }
        /******/

      }
      /******/

      /******/
      // at begin all updates modules are outdated

      /******/
      // the "outdated" status can propagate to parents if they don't accept the children

      /******/


      var outdatedDependencies = {};
      /******/

      var outdatedModules = [];
      /******/

      var appliedUpdate = {};
      /******/

      /******/

      var warnUnexpectedRequire = function warnUnexpectedRequire() {
        /******/
        console.warn(
        /******/
        "[HMR] unexpected require(" + result.moduleId + ") to disposed module"
        /******/
        );
        /******/
      };
      /******/

      /******/


      for (var id in hotUpdate) {
        /******/
        if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /******/
          moduleId = toModuleId(id);
          /******/

          /** @type {TODO} */

          /******/

          var result;
          /******/

          if (hotUpdate[id]) {
            /******/
            result = getAffectedStuff(moduleId);
            /******/
          } else {
            /******/
            result = {
              /******/
              type: "disposed",

              /******/
              moduleId: id
              /******/

            };
            /******/
          }
          /******/

          /** @type {Error|false} */

          /******/


          var abortError = false;
          /******/

          var doApply = false;
          /******/

          var doDispose = false;
          /******/

          var chainInfo = "";
          /******/

          if (result.chain) {
            /******/
            chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
            /******/
          }
          /******/


          switch (result.type) {
            /******/
            case "self-declined":
              /******/
              if (options.onDeclined) options.onDeclined(result);
              /******/

              if (!options.ignoreDeclined)
                /******/
                abortError = new Error(
                /******/
                "Aborted because of self decline: " +
                /******/
                result.moduleId +
                /******/
                chainInfo
                /******/
                );
              /******/

              break;

            /******/

            case "declined":
              /******/
              if (options.onDeclined) options.onDeclined(result);
              /******/

              if (!options.ignoreDeclined)
                /******/
                abortError = new Error(
                /******/
                "Aborted because of declined dependency: " +
                /******/
                result.moduleId +
                /******/
                " in " +
                /******/
                result.parentId +
                /******/
                chainInfo
                /******/
                );
              /******/

              break;

            /******/

            case "unaccepted":
              /******/
              if (options.onUnaccepted) options.onUnaccepted(result);
              /******/

              if (!options.ignoreUnaccepted)
                /******/
                abortError = new Error(
                /******/
                "Aborted because " + moduleId + " is not accepted" + chainInfo
                /******/
                );
              /******/

              break;

            /******/

            case "accepted":
              /******/
              if (options.onAccepted) options.onAccepted(result);
              /******/

              doApply = true;
              /******/

              break;

            /******/

            case "disposed":
              /******/
              if (options.onDisposed) options.onDisposed(result);
              /******/

              doDispose = true;
              /******/

              break;

            /******/

            default:
              /******/
              throw new Error("Unexception type " + result.type);

            /******/
          }
          /******/


          if (abortError) {
            /******/
            hotSetStatus("abort");
            /******/

            return Promise.reject(abortError);
            /******/
          }
          /******/


          if (doApply) {
            /******/
            appliedUpdate[moduleId] = hotUpdate[moduleId];
            /******/

            addAllToSet(outdatedModules, result.outdatedModules);
            /******/

            for (moduleId in result.outdatedDependencies) {
              /******/
              if (
              /******/
              Object.prototype.hasOwnProperty.call(
              /******/
              result.outdatedDependencies,
              /******/
              moduleId
              /******/
              )
              /******/
              ) {
                  /******/
                  if (!outdatedDependencies[moduleId])
                    /******/
                    outdatedDependencies[moduleId] = [];
                  /******/

                  addAllToSet(
                  /******/
                  outdatedDependencies[moduleId],
                  /******/
                  result.outdatedDependencies[moduleId]
                  /******/
                  );
                  /******/
                }
              /******/

            }
            /******/

          }
          /******/


          if (doDispose) {
            /******/
            addAllToSet(outdatedModules, [result.moduleId]);
            /******/

            appliedUpdate[moduleId] = warnUnexpectedRequire;
            /******/
          }
          /******/

        }
        /******/

      }
      /******/

      /******/
      // Store self accepted outdated modules to require them later by the module system

      /******/


      var outdatedSelfAcceptedModules = [];
      /******/

      for (i = 0; i < outdatedModules.length; i++) {
        /******/
        moduleId = outdatedModules[i];
        /******/

        if (
        /******/
        installedModules[moduleId] &&
        /******/
        installedModules[moduleId].hot._selfAccepted &&
        /******/
        // removed self-accepted modules should not be required

        /******/
        appliedUpdate[moduleId] !== warnUnexpectedRequire &&
        /******/
        // when called invalidate self-accepting is not possible

        /******/
        !installedModules[moduleId].hot._selfInvalidated
        /******/
        ) {
            /******/
            outdatedSelfAcceptedModules.push({
              /******/
              module: moduleId,

              /******/
              parents: installedModules[moduleId].parents.slice(),

              /******/
              errorHandler: installedModules[moduleId].hot._selfAccepted
              /******/

            });
            /******/
          }
        /******/

      }
      /******/

      /******/
      // Now in "dispose" phase

      /******/


      hotSetStatus("dispose");
      /******/

      Object.keys(hotAvailableFilesMap).forEach(function (chunkId) {
        /******/
        if (hotAvailableFilesMap[chunkId] === false) {
          /******/
          hotDisposeChunk(chunkId);
          /******/
        }
        /******/

      });
      /******/

      /******/

      var idx;
      /******/

      var queue = outdatedModules.slice();
      /******/

      while (queue.length > 0) {
        /******/
        moduleId = queue.pop();
        /******/

        module = installedModules[moduleId];
        /******/

        if (!module) continue;
        /******/

        /******/

        var data = {};
        /******/

        /******/
        // Call dispose handlers

        /******/

        var disposeHandlers = module.hot._disposeHandlers;
        /******/

        for (j = 0; j < disposeHandlers.length; j++) {
          /******/
          cb = disposeHandlers[j];
          /******/

          cb(data);
          /******/
        }
        /******/


        hotCurrentModuleData[moduleId] = data;
        /******/

        /******/
        // disable module (this disables requires from this module)

        /******/

        module.hot.active = false;
        /******/

        /******/
        // remove module from cache

        /******/

        delete installedModules[moduleId];
        /******/

        /******/
        // when disposing there is no need to call dispose handler

        /******/

        delete outdatedDependencies[moduleId];
        /******/

        /******/
        // remove "parents" references from all children

        /******/

        for (j = 0; j < module.children.length; j++) {
          /******/
          var child = installedModules[module.children[j]];
          /******/

          if (!child) continue;
          /******/

          idx = child.parents.indexOf(moduleId);
          /******/

          if (idx >= 0) {
            /******/
            child.parents.splice(idx, 1);
            /******/
          }
          /******/

        }
        /******/

      }
      /******/

      /******/
      // remove outdated dependency from module children

      /******/


      var dependency;
      /******/

      var moduleOutdatedDependencies;
      /******/

      for (moduleId in outdatedDependencies) {
        /******/
        if (
        /******/
        Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
        /******/
        ) {
            /******/
            module = installedModules[moduleId];
            /******/

            if (module) {
              /******/
              moduleOutdatedDependencies = outdatedDependencies[moduleId];
              /******/

              for (j = 0; j < moduleOutdatedDependencies.length; j++) {
                /******/
                dependency = moduleOutdatedDependencies[j];
                /******/

                idx = module.children.indexOf(dependency);
                /******/

                if (idx >= 0) module.children.splice(idx, 1);
                /******/
              }
              /******/

            }
            /******/

          }
        /******/

      }
      /******/

      /******/
      // Now in "apply" phase

      /******/


      hotSetStatus("apply");
      /******/

      /******/

      if (hotUpdateNewHash !== undefined) {
        /******/
        hotCurrentHash = hotUpdateNewHash;
        /******/

        hotUpdateNewHash = undefined;
        /******/
      }
      /******/


      hotUpdate = undefined;
      /******/

      /******/
      // insert new code

      /******/

      for (moduleId in appliedUpdate) {
        /******/
        if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
          /******/
          modules[moduleId] = appliedUpdate[moduleId];
          /******/
        }
        /******/

      }
      /******/

      /******/
      // call accept handlers

      /******/


      var error = null;
      /******/

      for (moduleId in outdatedDependencies) {
        /******/
        if (
        /******/
        Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
        /******/
        ) {
            /******/
            module = installedModules[moduleId];
            /******/

            if (module) {
              /******/
              moduleOutdatedDependencies = outdatedDependencies[moduleId];
              /******/

              var callbacks = [];
              /******/

              for (i = 0; i < moduleOutdatedDependencies.length; i++) {
                /******/
                dependency = moduleOutdatedDependencies[i];
                /******/

                cb = module.hot._acceptedDependencies[dependency];
                /******/

                if (cb) {
                  /******/
                  if (callbacks.indexOf(cb) !== -1) continue;
                  /******/

                  callbacks.push(cb);
                  /******/
                }
                /******/

              }
              /******/


              for (i = 0; i < callbacks.length; i++) {
                /******/
                cb = callbacks[i];
                /******/

                try {
                  /******/
                  cb(moduleOutdatedDependencies);
                  /******/
                } catch (err) {
                  /******/
                  if (options.onErrored) {
                    /******/
                    options.onErrored({
                      /******/
                      type: "accept-errored",

                      /******/
                      moduleId: moduleId,

                      /******/
                      dependencyId: moduleOutdatedDependencies[i],

                      /******/
                      error: err
                      /******/

                    });
                    /******/
                  }
                  /******/


                  if (!options.ignoreErrored) {
                    /******/
                    if (!error) error = err;
                    /******/
                  }
                  /******/

                }
                /******/

              }
              /******/

            }
            /******/

          }
        /******/

      }
      /******/

      /******/
      // Load self accepted modules

      /******/


      for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
        /******/
        var item = outdatedSelfAcceptedModules[i];
        /******/

        moduleId = item.module;
        /******/

        hotCurrentParents = item.parents;
        /******/

        hotCurrentChildModule = moduleId;
        /******/

        try {
          /******/
          __webpack_require__(moduleId);
          /******/

        } catch (err) {
          /******/
          if (typeof item.errorHandler === "function") {
            /******/
            try {
              /******/
              item.errorHandler(err);
              /******/
            } catch (err2) {
              /******/
              if (options.onErrored) {
                /******/
                options.onErrored({
                  /******/
                  type: "self-accept-error-handler-errored",

                  /******/
                  moduleId: moduleId,

                  /******/
                  error: err2,

                  /******/
                  originalError: err
                  /******/

                });
                /******/
              }
              /******/


              if (!options.ignoreErrored) {
                /******/
                if (!error) error = err2;
                /******/
              }
              /******/


              if (!error) error = err;
              /******/
            }
            /******/

          } else {
            /******/
            if (options.onErrored) {
              /******/
              options.onErrored({
                /******/
                type: "self-accept-errored",

                /******/
                moduleId: moduleId,

                /******/
                error: err
                /******/

              });
              /******/
            }
            /******/


            if (!options.ignoreErrored) {
              /******/
              if (!error) error = err;
              /******/
            }
            /******/

          }
          /******/

        }
        /******/

      }
      /******/

      /******/
      // handle errors in accept handlers and self accepted module load

      /******/


      if (error) {
        /******/
        hotSetStatus("fail");
        /******/

        return Promise.reject(error);
        /******/
      }
      /******/

      /******/


      if (hotQueuedInvalidatedModules) {
        /******/
        return hotApplyInternal(options).then(function (list) {
          /******/
          outdatedModules.forEach(function (moduleId) {
            /******/
            if (list.indexOf(moduleId) < 0) list.push(moduleId);
            /******/
          });
          /******/

          return list;
          /******/
        });
        /******/
      }
      /******/

      /******/


      hotSetStatus("idle");
      /******/

      return new Promise(function (resolve) {
        /******/
        resolve(outdatedModules);
        /******/
      });
      /******/
    }
    /******/

    /******/


    function hotApplyInvalidatedModules() {
      /******/
      if (hotQueuedInvalidatedModules) {
        /******/
        if (!hotUpdate) hotUpdate = {};
        /******/

        hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
        /******/

        hotQueuedInvalidatedModules = undefined;
        /******/

        return true;
        /******/
      }
      /******/

    }
    /******/

    /******/


    function hotApplyInvalidatedModule(moduleId) {
      /******/
      if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
        /******/
        hotUpdate[moduleId] = modules[moduleId];
      /******/
    }
    /******/

    /******/
    // The module cache

    /******/


    var installedModules = {};
    /******/

    /******/
    // The require function

    /******/

    function __webpack_require__(moduleId) {
      /******/

      /******/
      // Check if module is in cache

      /******/
      if (installedModules[moduleId]) {
        /******/
        return installedModules[moduleId].exports;
        /******/
      }
      /******/
      // Create a new module (and put it into the cache)

      /******/


      var module = installedModules[moduleId] = {
        /******/
        i: moduleId,

        /******/
        l: false,

        /******/
        exports: {},

        /******/
        hot: hotCreateModule(moduleId),

        /******/
        parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),

        /******/
        children: []
        /******/

      };
      /******/

      /******/
      // Execute the module function

      /******/

      modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
      /******/

      /******/
      // Flag the module as loaded

      /******/

      module.l = true;
      /******/

      /******/
      // Return the exports of the module

      /******/

      return module.exports;
      /******/
    }
    /******/

    /******/

    /******/
    // expose the modules object (__webpack_modules__)

    /******/


    __webpack_require__.m = modules;
    /******/

    /******/
    // expose the module cache

    /******/

    __webpack_require__.c = installedModules;
    /******/

    /******/
    // define getter function for harmony exports

    /******/

    __webpack_require__.d = function (exports, name, getter) {
      /******/
      if (!__webpack_require__.o(exports, name)) {
        /******/
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });
        /******/
      }
      /******/

    };
    /******/

    /******/
    // define __esModule on exports

    /******/


    __webpack_require__.r = function (exports) {
      /******/
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });
        /******/
      }
      /******/


      Object.defineProperty(exports, '__esModule', {
        value: true
      });
      /******/
    };
    /******/

    /******/
    // create a fake namespace object

    /******/
    // mode & 1: value is a module id, require it

    /******/
    // mode & 2: merge all properties of value into the ns

    /******/
    // mode & 4: return value when already ns object

    /******/
    // mode & 8|1: behave like require

    /******/


    __webpack_require__.t = function (value, mode) {
      /******/
      if (mode & 1) value = __webpack_require__(value);
      /******/

      if (mode & 8) return value;
      /******/

      if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/

      var ns = Object.create(null);
      /******/

      __webpack_require__.r(ns);
      /******/


      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });
      /******/

      if (mode & 2 && typeof value != 'string') for (var key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));
      }
      /******/

      return ns;
      /******/
    };
    /******/

    /******/
    // getDefaultExport function for compatibility with non-harmony modules

    /******/


    __webpack_require__.n = function (module) {
      /******/
      var getter = module && module.__esModule ?
      /******/
      function getDefault() {
        return module['default'];
      } :
      /******/
      function getModuleExports() {
        return module;
      };
      /******/

      __webpack_require__.d(getter, 'a', getter);
      /******/


      return getter;
      /******/
    };
    /******/

    /******/
    // Object.prototype.hasOwnProperty.call

    /******/


    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/

    /******/
    // __webpack_public_path__

    /******/


    __webpack_require__.p = "http://localhost:3200/";
    /******/

    /******/
    // __webpack_hash__

    /******/

    __webpack_require__.h = function () {
      return hotCurrentHash;
    };
    /******/

    /******/

    /******/
    // Load entry module and return exports

    /******/


    return hotCreateRequire(0)(__webpack_require__.s = 0);
    /******/
  }(
  /************************************************************************/

  /******/
  {
    /***/
    "../../../node_modules/bootstrap-hot-loader/build/hot.dev.js":
    /*!******************************************************************************************************************!*\
      !*** /Users/selama/projects/personal/react-resolved-promises/node_modules/bootstrap-hot-loader/build/hot.dev.js ***!
      \******************************************************************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesBootstrapHotLoaderBuildHotDevJs(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var express_1 = __webpack_require__(
      /*! express */
      "express");

      var context;
      var router;
      var wrappedFunction;

      exports.hot = function (sourceModule, _wrappedFunction_) {
        // When HMR triggers `sourceModule` will be re-evaluated.
        //
        // That will trigger a call to this function, updating our
        // internal `wrappedFunction` with the new value.
        wrappedFunction = _wrappedFunction_; // Use `sourceModule`'s HMR API to accept changes for it
        // and the modules it depends on.
        //
        // https://webpack.js.org/concepts/hot-module-replacement

        if (sourceModule.hot) {
          sourceModule.hot.accept();

          if (sourceModule.hot.addStatusHandler) {
            if (sourceModule.hot.status() === 'idle') {
              sourceModule.hot.addStatusHandler(function (status) {
                if (status === 'apply') {
                  // Updates the application state by invoking the new
                  // `wrappedFunction` and creating a new `router`.
                  setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return wrappedFunction(express_1.Router(), context);

                          case 3:
                            router = _context.sent;
                            _context.next = 9;
                            break;

                          case 6:
                            _context.prev = 6;
                            _context.t0 = _context["catch"](0);
                            console.log(_context.t0);

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, null, [[0, 6]]);
                  })));
                }
              });
            }
          }
        } // Return a wrapped function for `wix-bootstrap-ng` to use.
        // Note that this function will only run once.


        return /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(app, _context_) {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // Update the internal reference to `context`.
                    context = _context_; // Run the user's code with an empty router.

                    _context2.next = 3;
                    return wrappedFunction(express_1.Router(), context);

                  case 3:
                    router = _context2.sent;
                    // Return the original app but delegate to the router from the
                    // user's code.
                    //
                    // When HMR triggers and the `router` reference is updated, this
                    // app will start delegating to the new `router`.
                    app.use(function (req, res, next) {
                      // @ts-ignore
                      router.handle(req, res, next);
                    });
                    return _context2.abrupt("return", app);

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }();
      }; //# sourceMappingURL=hot.dev.js.map

      /***/

    },

    /***/
    "../../../node_modules/bootstrap-hot-loader/build/hot.prod.js":
    /*!*******************************************************************************************************************!*\
      !*** /Users/selama/projects/personal/react-resolved-promises/node_modules/bootstrap-hot-loader/build/hot.prod.js ***!
      \*******************************************************************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesBootstrapHotLoaderBuildHotProdJs(module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      exports.hot = function (sourceModule, wrappedFunction) {
        return wrappedFunction;
      }; //# sourceMappingURL=hot.prod.js.map

      /***/

    },

    /***/
    "../../../node_modules/bootstrap-hot-loader/index.js":
    /*!**********************************************************************************************************!*\
      !*** /Users/selama/projects/personal/react-resolved-promises/node_modules/bootstrap-hot-loader/index.js ***!
      \**********************************************************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesBootstrapHotLoaderIndexJs(module, exports, __webpack_require__) {
      if (false || process.env.NODE_ENV === 'production') {
        module.exports = __webpack_require__(
        /*! ./build/hot.prod */
        "../../../node_modules/bootstrap-hot-loader/build/hot.prod.js");
      } else {
        module.exports = __webpack_require__(
        /*! ./build/hot.dev */
        "../../../node_modules/bootstrap-hot-loader/build/hot.dev.js");
      }
      /***/

    },

    /***/
    "../../../node_modules/webpack/buildin/harmony-module.js":
    /*!*******************************************!*\
      !*** (webpack)/buildin/harmony-module.js ***!
      \*******************************************/

    /*! no static exports found */

    /***/
    function node_modulesWebpackBuildinHarmonyModuleJs(module, exports) {
      module.exports = function (originalModule) {
        if (!originalModule.webpackPolyfill) {
          var module = Object.create(originalModule); // module.parent = undefined by default

          if (!module.children) module.children = [];
          Object.defineProperty(module, "loaded", {
            enumerable: true,
            get: function get() {
              return module.l;
            }
          });
          Object.defineProperty(module, "id", {
            enumerable: true,
            get: function get() {
              return module.i;
            }
          });
          Object.defineProperty(module, "exports", {
            enumerable: true
          });
          module.webpackPolyfill = 1;
        }

        return module;
      };
      /***/

    },

    /***/
    "../../../node_modules/webpack/hot/log-apply-result.js":
    /*!*****************************************!*\
      !*** (webpack)/hot/log-apply-result.js ***!
      \*****************************************/

    /*! no static exports found */

    /***/
    function node_modulesWebpackHotLogApplyResultJs(module, exports, __webpack_require__) {
      /*
      	MIT License http://www.opensource.org/licenses/mit-license.php
      	Author Tobias Koppers @sokra
      */
      module.exports = function (updatedModules, renewedModules) {
        var unacceptedModules = updatedModules.filter(function (moduleId) {
          return renewedModules && renewedModules.indexOf(moduleId) < 0;
        });

        var log = __webpack_require__(
        /*! ./log */
        "../../../node_modules/webpack/hot/log.js");

        if (unacceptedModules.length > 0) {
          log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
          unacceptedModules.forEach(function (moduleId) {
            log("warning", "[HMR]  - " + moduleId);
          });
        }

        if (!renewedModules || renewedModules.length === 0) {
          log("info", "[HMR] Nothing hot updated.");
        } else {
          log("info", "[HMR] Updated modules:");
          renewedModules.forEach(function (moduleId) {
            if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
              var parts = moduleId.split("!");
              log.groupCollapsed("info", "[HMR]  - " + parts.pop());
              log("info", "[HMR]  - " + moduleId);
              log.groupEnd("info");
            } else {
              log("info", "[HMR]  - " + moduleId);
            }
          });
          var numberIds = renewedModules.every(function (moduleId) {
            return typeof moduleId === "number";
          });
          if (numberIds) log("info", "[HMR] Consider using the NamedModulesPlugin for module names.");
        }
      };
      /***/

    },

    /***/
    "../../../node_modules/webpack/hot/log.js":
    /*!****************************!*\
      !*** (webpack)/hot/log.js ***!
      \****************************/

    /*! no static exports found */

    /***/
    function node_modulesWebpackHotLogJs(module, exports) {
      var logLevel = "info";

      function dummy() {}

      function shouldLog(level) {
        var shouldLog = logLevel === "info" && level === "info" || ["info", "warning"].indexOf(logLevel) >= 0 && level === "warning" || ["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error";
        return shouldLog;
      }

      function logGroup(logFn) {
        return function (level, msg) {
          if (shouldLog(level)) {
            logFn(msg);
          }
        };
      }

      module.exports = function (level, msg) {
        if (shouldLog(level)) {
          if (level === "info") {
            console.log(msg);
          } else if (level === "warning") {
            console.warn(msg);
          } else if (level === "error") {
            console.error(msg);
          }
        }
      };
      /* eslint-disable node/no-unsupported-features/node-builtins */


      var group = console.group || dummy;
      var groupCollapsed = console.groupCollapsed || dummy;
      var groupEnd = console.groupEnd || dummy;
      /* eslint-enable node/no-unsupported-features/node-builtins */

      module.exports.group = logGroup(group);
      module.exports.groupCollapsed = logGroup(groupCollapsed);
      module.exports.groupEnd = logGroup(groupEnd);

      module.exports.setLogLevel = function (level) {
        logLevel = level;
      };

      module.exports.formatError = function (err) {
        var message = err.message;
        var stack = err.stack;

        if (!stack) {
          return message;
        } else if (stack.indexOf(message) < 0) {
          return message + "\n" + stack;
        } else {
          return stack;
        }
      };
      /***/

    },

    /***/
    "../../../node_modules/yoshi-common/build/utils/server-hot-client.js?49963":
    /*!********************************************************************************************************************************!*\
      !*** /Users/selama/projects/personal/react-resolved-promises/node_modules/yoshi-common/build/utils/server-hot-client.js?49963 ***!
      \********************************************************************************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesYoshiCommonBuildUtilsServerHotClientJs49963(module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */
      (function (__resourceQuery) {
        /* global __resourceQuery */
        if (true) {
          var log = __webpack_require__(
          /*! webpack/hot/log */
          "../../../node_modules/webpack/hot/log.js");

          var SockJS = __webpack_require__(
          /*! sockjs-client */
          "sockjs-client");

          var port = __resourceQuery.substr(1);

          var socket = new SockJS("http://localhost:" + port + "/_yoshi_server_hmr_");

          socket.onmessage = function checkForUpdate(fromUpdate) {
            if (module.hot.status() === 'idle') {
              module.hot.check(true).then(function (updatedModules) {
                if (!updatedModules) {
                  if (fromUpdate) log('info', '[HMR] Update applied.');
                  return;
                }

                __webpack_require__(
                /*! webpack/hot/log-apply-result */
                "../../../node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);

                checkForUpdate(true); // Inform the parent process (Yoshi) that HMR was successful

                socket.send(JSON.stringify({
                  success: true
                }));
              })["catch"](function (err) {
                var status = module.hot.status();

                if (['abort', 'fail'].indexOf(status) >= 0) {
                  log('warning', '[HMR] Cannot apply update.');
                  log('warning', '[HMR] ' + (err.stack || err.message));
                  log('warning', '[HMR] Restarting the application!'); // Inform the parent process (Yoshi) that HMR failed and the server
                  // needs to be restarted

                  socket.send(JSON.stringify({
                    success: false
                  }));
                } else {
                  log('warning', '[HMR] Update failed: ' + (err.stack || err.message));
                }
              });
            }
          };
        } else {}
        /* WEBPACK VAR INJECTION */

      }).call(this, "?49963");
      /***/
    },

    /***/
    "./components/App/App.scss":
    /*!*********************************!*\
      !*** ./components/App/App.scss ***!
      \*********************************/

    /*! no static exports found */

    /***/
    function componentsAppAppScss(module, exports) {
      module.exports = {
        "root": "components-App-App__root__3h_Ll",
        "title": "components-App-App__title__C1ajN"
      };
      /***/
    },

    /***/
    "./components/App/App.tsx":
    /*!********************************!*\
      !*** ./components/App/App.tsx ***!
      \********************************/

    /*! exports provided: default */

    /***/
    function componentsAppAppTsx(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! react */
      "react");
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _App_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./App.scss */
      "./components/App/App.scss");
      /* harmony import */


      var _App_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var _SW_sw__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../SW/sw */
      "./components/SW/sw.tsx");

      var App = /*#__PURE__*/function (_react__WEBPACK_IMPOR) {
        _inheritsLoose(App, _react__WEBPACK_IMPOR);

        function App() {
          return _react__WEBPACK_IMPOR.apply(this, arguments) || this;
        }

        var _proto = App.prototype;

        _proto.render = function render() {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: _App_scss__WEBPACK_IMPORTED_MODULE_1___default.a.root
          }, "SELA", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SW_sw__WEBPACK_IMPORTED_MODULE_2__["SW"], null));
        };

        return App;
      }(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);
      /* harmony default export */


      __webpack_exports__["default"] = App;
      /***/
    },

    /***/
    "./components/App/index.ts":
    /*!*********************************!*\
      !*** ./components/App/index.ts ***!
      \*********************************/

    /*! exports provided: default */

    /***/
    function componentsAppIndexTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./App */
      "./components/App/App.tsx");
      /* harmony reexport (safe) */


      __webpack_require__.d(__webpack_exports__, "default", function () {
        return _App__WEBPACK_IMPORTED_MODULE_0__["default"];
      });
      /***/

    },

    /***/
    "./components/SW/sw.tsx":
    /*!******************************!*\
      !*** ./components/SW/sw.tsx ***!
      \******************************/

    /*! exports provided: SW */

    /***/
    function componentsSWSwTsx(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SW", function () {
        return SW;
      });
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! react */
      "react");
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @wix/react-resolved-promises */
      "@wix/react-resolved-promises");
      /* harmony import */


      var _wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! axios */
      "axios");
      /* harmony import */


      var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);

      var getChar = function getChar(id) {
        return axios__WEBPACK_IMPORTED_MODULE_2___default.a.get("https://swapi.dev/api/people/" + id + "/").then(function (_ref3) {
          var data = _ref3.data;
          return data;
        });
      };

      var SW = function SW() {
        var _Object = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(1),
            id = _Object[0],
            setId = _Object[1];

        var _Object2 = Object(_wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_1__["useResolvedPromise"])('/people/1/', function () {
          return getChar(id);
        }),
            status = _Object2.status,
            data = _Object2.data,
            rerun = _Object2.rerun;

        Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
          rerun(function () {
            return getChar(id);
          });
        }, [id]);

        if (status === _wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_1__["ResolvedPromiseStatus"].PENDING || status === _wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_1__["ResolvedPromiseStatus"].PENDING_RERUN) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "LOADING...");
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, data.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
          onClick: function onClick() {
            setId(id + 1);
          }
        }, "next"));
      };
      /***/

    },

    /***/
    "./server.ts":
    /*!*******************!*\
      !*** ./server.ts ***!
      \*******************/

    /*! exports provided: default */

    /***/
    function serverTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* WEBPACK VAR INJECTION */


      (function (module) {
        /* harmony import */
        var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! path */
        "path");
        /* harmony import */


        var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var bootstrap_hot_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! bootstrap-hot-loader */
        "../../../node_modules/bootstrap-hot-loader/index.js");
        /* harmony import */


        var bootstrap_hot_loader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_hot_loader__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */


        var _wix_wix_express_csrf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! @wix/wix-express-csrf */
        "@wix/wix-express-csrf");
        /* harmony import */


        var _wix_wix_express_csrf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wix_wix_express_csrf__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */


        var _wix_wix_express_require_https__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! @wix/wix-express-require-https */
        "@wix/wix-express-require-https");
        /* harmony import */


        var _wix_wix_express_require_https__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wix_wix_express_require_https__WEBPACK_IMPORTED_MODULE_3__);
        /* harmony import */


        var wix_node_i18n_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! wix-node-i18n-cache */
        "wix-node-i18n-cache");
        /* harmony import */


        var wix_node_i18n_cache__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(wix_node_i18n_cache__WEBPACK_IMPORTED_MODULE_4__);
        /* harmony import */


        var _ssr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./ssr */
        "./ssr.tsx"); // caches translation files and serves them per request
        // https://github.com/wix-private/wix-node-i18n-cache


        var localI18NCache = new wix_node_i18n_cache__WEBPACK_IMPORTED_MODULE_4__({
          localeFilePath: path__WEBPACK_IMPORTED_MODULE_0__["join"](__dirname, 'statics', 'assets', 'locales')
        }); // This function is the main entry for our server. It accepts an express Router
        // (see http://expressjs.com) and attaches routes and middlewares to it.
        //
        // `context` is an object with built-in services from `wix-bootstrap-ng`. See
        // https://github.com/wix-platform/wix-node-platform/tree/master/bootstrap/wix-bootstrap-ng).

        /* harmony default export */

        __webpack_exports__["default"] = Object(bootstrap_hot_loader__WEBPACK_IMPORTED_MODULE_1__["hot"])(module, function (app, context) {
          // We load the already parsed ERB configuration (located at /templates folder).
          var config = context.config.load('ssr-demo'); // Attach CSRF protection middleware. See
          // https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-csrf.

          app.use(_wix_wix_express_csrf__WEBPACK_IMPORTED_MODULE_2___default()()); // Require HTTPS by redirecting to HTTPS from HTTP. Only active in a production environment.
          // See https://github.com/wix-platform/wix-node-platform/tree/master/express/wix-express-require-https.

          app.use(_wix_wix_express_require_https__WEBPACK_IMPORTED_MODULE_3___default.a); // Attach a rendering middleware, it adds the `renderView` method to every request.
          // See https://github.com/wix-private/fed-infra/tree/master/wix-bootstrap-renderer.

          app.use(context.renderer.middleware()); // Define a route to render our initial HTML.

          app.get('/', /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
              var renderModel, html;
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      // Extract some data from every incoming request.
                      renderModel = getRenderModel(req);
                      _context3.next = 3;
                      return Object(_ssr__WEBPACK_IMPORTED_MODULE_5__["getHtml"])();

                    case 3:
                      html = _context3.sent;
                      console.log('html ===========>', html); // Send a response back to the client.

                      res.renderView('./index.ejs', Object.assign(Object.assign({}, renderModel), {
                        html: html
                      }));

                    case 6:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }));

            return function (_x3, _x4) {
              return _ref4.apply(this, arguments);
            };
          }());

          function getRenderModel(req) {
            var _req$aspects$webCont = req.aspects['web-context'],
                language = _req$aspects$webCont.language,
                basename = _req$aspects$webCont.basename,
                debug = _req$aspects$webCont.debug;
            return {
              language: language,
              basename: basename,
              messages: JSON.stringify(localI18NCache.getLocaleData(language)),
              debug: debug || process.env.NODE_ENV === 'development',
              title: 'Wix Full Stack Project Boilerplate',
              staticsDomain: config.clientTopology.staticsDomain
            };
          }

          return app;
        });
        /* WEBPACK VAR INJECTION */
      }).call(this, __webpack_require__(
      /*! ./../../../node_modules/webpack/buildin/harmony-module.js */
      "../../../node_modules/webpack/buildin/harmony-module.js")(module));
      /***/
    },

    /***/
    "./ssr.tsx":
    /*!*****************!*\
      !*** ./ssr.tsx ***!
      \*****************/

    /*! exports provided: getHtml */

    /***/
    function ssrTsx(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "getHtml", function () {
        return getHtml;
      });
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! react */
      "react");
      /* harmony import */


      var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/App */
      "./components/App/index.ts");
      /* harmony import */


      var _wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @wix/react-resolved-promises */
      "@wix/react-resolved-promises");
      /* harmony import */


      var _wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_2__);

      var getHtml = /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
          var _yield$Object, html;

          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return Object(_wix_react_resolved_promises__WEBPACK_IMPORTED_MODULE_2__["renderToStringOnResolvedPromises"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"], null));

                case 2:
                  _yield$Object = _context4.sent;
                  html = _yield$Object.html;

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function getHtml() {
          return _ref5.apply(this, arguments);
        };
      }();
      /***/

    },

    /***/
    0:
    /*!***********************************************************************************************************************************************!*\
      !*** multi /Users/selama/projects/personal/react-resolved-promises/node_modules/yoshi-common/build/utils/server-hot-client.js?49963 ./server ***!
      \***********************************************************************************************************************************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      __webpack_require__(
      /*! /Users/selama/projects/personal/react-resolved-promises/node_modules/yoshi-common/build/utils/server-hot-client.js?49963 */
      "../../../node_modules/yoshi-common/build/utils/server-hot-client.js?49963");

      module.exports = __webpack_require__(
      /*! ./server */
      "./server.ts");
      /***/
    },

    /***/
    "@wix/react-resolved-promises":
    /*!***********************************************!*\
      !*** external "@wix/react-resolved-promises" ***!
      \***********************************************/

    /*! no static exports found */

    /***/
    function wixReactResolvedPromises(module, exports) {
      module.exports = require("@wix/react-resolved-promises");
      /***/
    },

    /***/
    "@wix/wix-express-csrf":
    /*!****************************************!*\
      !*** external "@wix/wix-express-csrf" ***!
      \****************************************/

    /*! no static exports found */

    /***/
    function wixWixExpressCsrf(module, exports) {
      module.exports = require("@wix/wix-express-csrf");
      /***/
    },

    /***/
    "@wix/wix-express-require-https":
    /*!*************************************************!*\
      !*** external "@wix/wix-express-require-https" ***!
      \*************************************************/

    /*! no static exports found */

    /***/
    function wixWixExpressRequireHttps(module, exports) {
      module.exports = require("@wix/wix-express-require-https");
      /***/
    },

    /***/
    "axios":
    /*!************************!*\
      !*** external "axios" ***!
      \************************/

    /*! no static exports found */

    /***/
    function axios(module, exports) {
      module.exports = require("axios");
      /***/
    },

    /***/
    "express":
    /*!**************************!*\
      !*** external "express" ***!
      \**************************/

    /*! no static exports found */

    /***/
    function express(module, exports) {
      module.exports = require("express");
      /***/
    },

    /***/
    "path":
    /*!***********************!*\
      !*** external "path" ***!
      \***********************/

    /*! no static exports found */

    /***/
    function path(module, exports) {
      module.exports = require("path");
      /***/
    },

    /***/
    "react":
    /*!************************!*\
      !*** external "react" ***!
      \************************/

    /*! no static exports found */

    /***/
    function react(module, exports) {
      module.exports = require("react");
      /***/
    },

    /***/
    "sockjs-client":
    /*!********************************!*\
      !*** external "sockjs-client" ***!
      \********************************/

    /*! no static exports found */

    /***/
    function sockjsClient(module, exports) {
      module.exports = require("sockjs-client");
      /***/
    },

    /***/
    "wix-node-i18n-cache":
    /*!**************************************!*\
      !*** external "wix-node-i18n-cache" ***!
      \**************************************/

    /*! no static exports found */

    /***/
    function wixNodeI18nCache(module, exports) {
      module.exports = require("wix-node-i18n-cache");
      /***/
    }
    /******/

  }));
});