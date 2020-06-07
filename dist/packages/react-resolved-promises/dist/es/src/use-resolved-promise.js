"use strict";

exports.__esModule = true;
exports.renderToStringOnResolvedPromises = exports.ResolvedPromiseProvider = exports.ResolvedPromiseContext = exports.ResolvedPromiseMode = exports.useResolvedPromise = exports.ResolvedPromiseStatus = void 0;

var _tslib = require("tslib");

var _react = _interopRequireWildcard(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ResolvedPromiseStatus;
exports.ResolvedPromiseStatus = ResolvedPromiseStatus;

(function (ResolvedPromiseStatus) {
  ResolvedPromiseStatus["PENDING"] = "pending";
  ResolvedPromiseStatus["PENDING_RERUN"] = "pending-rerun";
  ResolvedPromiseStatus["RESOLVED"] = "resolved";
  ResolvedPromiseStatus["REJECT"] = "reject";
  ResolvedPromiseStatus["SETTLED"] = "settled";
})(ResolvedPromiseStatus || (exports.ResolvedPromiseStatus = ResolvedPromiseStatus = {}));

;

var getInitStatus = function getInitStatus(promiseId, memo) {
  var _a;

  if ((_a = memo) === null || _a === void 0 ? void 0 : _a.get(promiseId)) {
    return ResolvedPromiseStatus.SETTLED;
  }

  return ResolvedPromiseStatus.PENDING;
};

var getInitData = function getInitData(promiseId, memo) {
  var _a;

  return (_a = memo) === null || _a === void 0 ? void 0 : _a.get(promiseId);
};

var useResolvedPromise = function useResolvedPromise(promiseId, asyncFunction) {
  var _a = (0, _react.useContext)(ResolvedPromiseContext),
      mode = _a.mode,
      memo = _a.memo,
      addPromiseToResolve = _a.addPromiseToResolve;

  var _b = (0, _react.useState)(getInitStatus(promiseId, memo)),
      status = _b[0],
      setStatus = _b[1];

  var _c = (0, _react.useState)(getInitData(promiseId, memo)),
      data = _c[0],
      setData = _c[1];

  var onResolve = function onResolve(data) {
    setData(data);
    setStatus(ResolvedPromiseStatus.RESOLVED);
  };

  var onReject = function onReject(data) {
    setData(data);
    setStatus(ResolvedPromiseStatus.REJECT);
  };

  var rerun = function rerun(anotherAsyncFunction) {
    setStatus(ResolvedPromiseStatus.PENDING_RERUN);
    anotherAsyncFunction().then(onResolve)["catch"](onReject);
  }; //effect for non memoized(status===pending) browser(useEffect works only in browser).


  (0, _react.useEffect)(function () {
    if (status === ResolvedPromiseStatus.PENDING) {
      asyncFunction().then(onResolve)["catch"](onReject);
    }
  }, []);

  if (mode === ResolvedPromiseMode.SSR && status === ResolvedPromiseStatus.PENDING && addPromiseToResolve) {
    addPromiseToResolve(asyncFunction().then(function (data) {
      return memo.set(promiseId, data);
    })["catch"](function (data) {
      return memo.set(promiseId, data);
    }));
  }

  return {
    status: status,
    data: data,
    rerun: rerun
  };
};

exports.useResolvedPromise = useResolvedPromise;
var ResolvedPromiseMode;
exports.ResolvedPromiseMode = ResolvedPromiseMode;

(function (ResolvedPromiseMode) {
  ResolvedPromiseMode["SSR"] = "ssr";
  ResolvedPromiseMode["BROWSER"] = "browser";
})(ResolvedPromiseMode || (exports.ResolvedPromiseMode = ResolvedPromiseMode = {}));

var ResolvedPromiseContext = (0, _react.createContext)({
  mode: ResolvedPromiseMode.BROWSER
});
exports.ResolvedPromiseContext = ResolvedPromiseContext;

var ResolvedPromiseProvider = function ResolvedPromiseProvider(_a) {
  var memo = _a.memo,
      children = _a.children;
  return /*#__PURE__*/_react["default"].createElement(ResolvedPromiseContext.Provider, {
    value: {
      mode: ResolvedPromiseMode.BROWSER,
      memo: jsonToMap(memo)
    }
  }, children);
};

exports.ResolvedPromiseProvider = ResolvedPromiseProvider;

var renderToStringOnResolvedPromises = function renderToStringOnResolvedPromises(Component) {
  return (0, _tslib.__awaiter)(void 0, void 0, void 0, function () {
    var memo, overallPromisesToResolve, addPromiseToResolve, prevOverallFetchersPromisesLength, html;
    return (0, _tslib.__generator)(this, function (_a) {
      switch (_a.label) {
        case 0:
          memo = new Map();
          overallPromisesToResolve = [];

          addPromiseToResolve = function addPromiseToResolve(promise) {
            overallPromisesToResolve.push(promise);
          };

          prevOverallFetchersPromisesLength = overallPromisesToResolve.length;
          html = renderAttempt(Component, memo, addPromiseToResolve);
          _a.label = 1;

        case 1:
          if (!(overallPromisesToResolve.length > prevOverallFetchersPromisesLength)) return [3
          /*break*/
          , 3];
          prevOverallFetchersPromisesLength = overallPromisesToResolve.length;
          return [4
          /*yield*/
          , Promise.all(overallPromisesToResolve)];

        case 2:
          _a.sent();

          html = renderAttempt(Component, memo, addPromiseToResolve);
          return [3
          /*break*/
          , 1];

        case 3:
          return [2
          /*return*/
          , {
            html: html,
            memo: mapToJson(memo)
          }];
      }
    });
  });
};

exports.renderToStringOnResolvedPromises = renderToStringOnResolvedPromises;

var renderAttempt = function renderAttempt(Component, memo, addPromiseToResolve) {
  return _server["default"].renderToString( /*#__PURE__*/_react["default"].createElement(ResolvedPromiseContext.Provider, {
    value: {
      mode: ResolvedPromiseMode.SSR,
      memo: memo,
      addPromiseToResolve: addPromiseToResolve
    }
  }, Component));
};

var mapToJson = function mapToJson(m) {
  var json = {};
  m.forEach(function (v, k) {
    json[k] = v;
  });
  return json;
};

var jsonToMap = function jsonToMap(json) {
  var m = new Map();
  Object.keys(json).forEach(function (key) {
    return m.set(key, json[key]);
  });
  return m;
};