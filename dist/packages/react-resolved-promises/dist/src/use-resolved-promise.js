"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = require("tslib");

var react_1 = tslib_1.__importStar(require("react"));

var server_1 = tslib_1.__importDefault(require("react-dom/server"));

var ResolvedPromiseStatus;

(function (ResolvedPromiseStatus) {
  ResolvedPromiseStatus["PENDING"] = "pending";
  ResolvedPromiseStatus["PENDING_RERUN"] = "pending-rerun";
  ResolvedPromiseStatus["RESOLVED"] = "resolved";
  ResolvedPromiseStatus["REJECT"] = "reject";
})(ResolvedPromiseStatus = exports.ResolvedPromiseStatus || (exports.ResolvedPromiseStatus = {}));

;

var getInitStatus = function getInitStatus(promiseId, memo) {
  var _a;

  if ((_a = memo) === null || _a === void 0 ? void 0 : _a.get(promiseId)) {
    return ResolvedPromiseStatus.RESOLVED;
  }

  return ResolvedPromiseStatus.PENDING;
};

var getInitData = function getInitData(promiseId, memo) {
  var _a;

  return (_a = memo) === null || _a === void 0 ? void 0 : _a.get(promiseId);
};

exports.useResolvedPromise = function (promiseId, asyncFunction) {
  var _a = react_1.useContext(exports.ResolvedPromiseContext),
      mode = _a.mode,
      memo = _a.memo;

  var _b = react_1.useState(getInitStatus(promiseId, memo)),
      status = _b[0],
      setStatus = _b[1];

  var _c = react_1.useState(getInitData(promiseId, memo)),
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


  react_1.useEffect(function () {
    if (status === ResolvedPromiseStatus.PENDING) {
      asyncFunction().then(onResolve)["catch"](onReject);
    }
  }, []);

  if (mode === ResolvedPromiseMode.SSR && status === ResolvedPromiseStatus.PENDING) {}

  return {
    status: status,
    data: data,
    rerun: rerun
  };
  return {
    status: ResolvedPromiseStatus.PENDING,
    data: {},
    rerun: function rerun() {}
  };
};

var ResolvedPromiseMode;

(function (ResolvedPromiseMode) {
  ResolvedPromiseMode["SSR"] = "ssr";
  ResolvedPromiseMode["BROWSER"] = "browser";
})(ResolvedPromiseMode || (ResolvedPromiseMode = {}));

exports.ResolvedPromiseContext = react_1.createContext({
  mode: ResolvedPromiseMode.BROWSER
});

exports.ResolvedPromiseProvider = function (_a) {
  var memo = _a.memo,
      children = _a.children;
  return react_1["default"].createElement(exports.ResolvedPromiseContext.Provider, {
    value: {
      mode: ResolvedPromiseMode.BROWSER,
      memo: memo
    }
  }, children);
};

exports.renderToStringOnResolvedPromises = function (Component) {
  return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var memo, overallPromisesToResolve, addPromiseToResolve, prevOverallFetchersPromisesLength, html;
    return tslib_1.__generator(this, function (_a) {
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
            memo: memo
          }];
      }
    });
  });
};

var renderAttempt = function renderAttempt(Component, memo, addPromiseToResolve) {
  return server_1["default"].renderToString(react_1["default"].createElement(exports.ResolvedPromiseContext.Provider, {
    value: {
      mode: ResolvedPromiseMode.SSR,
      memo: memo,
      addPromiseToResolve: addPromiseToResolve
    }
  }, Component));
};