/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 133);
/******/ })
/************************************************************************/
/******/ ({

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(314);

var _reactRouter = __webpack_require__(322);

var _app = __webpack_require__(132);

var _app2 = _interopRequireDefault(_app);

var _company_container = __webpack_require__(345);

var _company_container2 = _interopRequireDefault(_company_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function Root(_ref) {
  var store = _ref.store;

  return _react2.default.createElement(
    _reactRedux.Provider,
    { store: store },
    _react2.default.createElement(
      _reactRouter.Router,
      { history: _reactRouter.hashHistory },
      _react2.default.createElement(
        _reactRouter.Route,
        { path: '/', component: _app2.default },
        _react2.default.createElement(_reactRouter.Route, { path: 'company/:ticker', component: _company_container2.default })
      )
    )
  );
};

exports.default = Root;

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(75);

var _root_reducer = __webpack_require__(136);

var _root_reducer2 = _interopRequireDefault(_root_reducer);

var _reduxThunk = __webpack_require__(335);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore() {
  var preloadedState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _redux.createStore)(_root_reducer2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
};

exports.default = configureStore;

/***/ }),

/***/ 130:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/react-dom/index.js'\n    at Error (native)");

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchCompany = exports.RECEIVE_COMPANY = undefined;

var _company_api_util = __webpack_require__(138);

var CompanyAPIUtil = _interopRequireWildcard(_company_api_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RECEIVE_COMPANY = exports.RECEIVE_COMPANY = "RECEIVE_COMPANY";

var fetchCompany = exports.fetchCompany = function fetchCompany(ticker) {
  return function (dispatch) {
    return CompanyAPIUtil.fetchCompany(ticker).then(function (company) {
      return dispatch(receiveCompany);
    });
  };
};

var receiveCompany = function receiveCompany(company) {
  return {
    type: RECEIVE_COMPANY,
    company: company
  };
};

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    null,
    children
  );
};

exports.default = App;

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(130);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _store = __webpack_require__(129);

var _store2 = _interopRequireDefault(_store);

var _root = __webpack_require__(128);

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var store = void 0;

  store = (0, _store2.default)();

  window.store = store;

  var root = document.getElementById('root');
  _reactDom2.default.render(_react2.default.createElement(_root2.default, { store: store }), root);
});

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _company_actions = __webpack_require__(131);

var _lodash = __webpack_require__(231);

var CompanyReducer = function CompanyReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _company_actions.RECEIVE_COMPANY:
      return action.company;
    default:
      return state;
  }
};

exports.default = CompanyReducer;

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session_actions = __webpack_require__(76);

var _merge = __webpack_require__(232);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _nullErrors = Object.freeze({
  session: {}
});

var ErrorsReducer = function ErrorsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _nullErrors;
  var action = arguments[1];

  Object.freeze(state);
  var newState = (0, _merge2.default)({}, state);
  switch (action.type) {
    case _session_actions.RECEIVE_SESSION_ERRORS:
      var sessionErrors = action.errors;
      newState.session = sessionErrors;
      return newState;
    case _session_actions.REMOVE_SESSION_ERRORS:
      newState.session = [];
      return newState;
    default:
      return state;
  }
};

exports.default = ErrorsReducer;

/***/ }),

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(75);

var _company_reducer = __webpack_require__(134);

var _company_reducer2 = _interopRequireDefault(_company_reducer);

var _session_reducer = __webpack_require__(137);

var _session_reducer2 = _interopRequireDefault(_session_reducer);

var _errors_reducer = __webpack_require__(135);

var _errors_reducer2 = _interopRequireDefault(_errors_reducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  company: _company_reducer2.default,
  currentUser: _session_reducer2.default,
  errors: _errors_reducer2.default
});

exports.default = rootReducer;

/***/ }),

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _session_actions = __webpack_require__(76);

var _nullUser = null;

var SessionReducer = function SessionReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _nullUser;
  var action = arguments[1];

  Object.freeze(state);
  switch (action.type) {
    case _session_actions.RECEIVE_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};

exports.default = SessionReducer;

/***/ }),

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var fetchCompany = exports.fetchCompany = function fetchCompany(ticker) {
  return $.ajax({
    method: "GET",
    url: "/fantasy_investing/company/" + ticker
  });
};

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var signup = exports.signup = function signup(user) {
  return $.ajax({
    method: 'POST',
    url: 'api/users',
    data: user
  });
};

var login = exports.login = function login(user) {
  return $.ajax({
    method: 'POST',
    url: 'api/session',
    data: user
  });
};

var logout = exports.logout = function logout() {
  return $.ajax({
    method: 'DELETE',
    url: 'api/session'
  });
};

/***/ }),

/***/ 231:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/lodash/lodash.js'\n    at Error (native)");

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/lodash/merge.js'\n    at Error (native)");

/***/ }),

/***/ 314:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/react-redux/es/index.js'\n    at Error (native)");

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/react-router/es/index.js'\n    at Error (native)");

/***/ }),

/***/ 335:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/redux-thunk/lib/index.js'\n    at Error (native)");

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Company = function (_React$Component) {
  _inherits(Company, _React$Component);

  function Company(props) {
    _classCallCheck(this, Company);

    return _possibleConstructorReturn(this, (Company.__proto__ || Object.getPrototypeOf(Company)).call(this, props));
  }

  _createClass(Company, [{
    key: 'render',
    value: function render() {
      var company = void 0;
      if (this.props.company) {
        company = this.props.company.title;
      }

      return _react2.default.createElement(
        'div',
        null,
        'I am working!'
      );
    }
  }]);

  return Company;
}(_react2.default.Component);

exports.default = Company;

/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(314);

var _company_actions = __webpack_require__(131);

var _company = __webpack_require__(344);

var _company2 = _interopRequireDefault(_company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    company: state.company
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref) {
  var params = _ref.params;

  return {
    fetchCompany: function fetchCompany() {
      return dispatch((0, _company_actions.fetchCompany)(params.ticker));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_company2.default);

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/react/react.js'\n    at Error (native)");

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/bokats/app_academy/projects/fantasy_investing/node_modules/redux/es/index.js'\n    at Error (native)");

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.signup = exports.removeErrors = exports.receiveErrors = exports.receiveCurrentUser = exports.REMOVE_SESSION_ERRORS = exports.RECEIVE_SESSION_ERRORS = exports.RECEIVE_CURRENT_USER = undefined;

var _session_api_util = __webpack_require__(139);

var APIUtil = _interopRequireWildcard(_session_api_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RECEIVE_CURRENT_USER = exports.RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
var RECEIVE_SESSION_ERRORS = exports.RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
var REMOVE_SESSION_ERRORS = exports.REMOVE_SESSION_ERRORS = "REMOVE_SESSION_ERRORS";

var receiveCurrentUser = exports.receiveCurrentUser = function receiveCurrentUser(currentUser) {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
};

var receiveErrors = exports.receiveErrors = function receiveErrors(errors) {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};

var removeErrors = exports.removeErrors = function removeErrors() {
  return {
    type: REMOVE_SESSION_ERRORS
  };
};

var signup = exports.signup = function signup(user) {
  return function (dispatch) {
    return APIUtil.signup(user).then(function (res) {
      return dispatch(receiveCurrentUser(res));
    }, function (err) {
      return dispatch(receiveErrors(err.responseJSON));
    });
  };
};

var login = exports.login = function login(user) {
  return function (dispatch) {
    return APIUtil.login(user).then(function (res) {
      return dispatch(receiveCurrentUser(res));
    }, function (err) {
      return dispatch(receiveErrors(err.responseJSON));
    });
  };
};

var logout = exports.logout = function logout() {
  return function (dispatch) {
    return APIUtil.logout().then(function (res) {
      return dispatch(receiveCurrentUser(null));
    });
  };
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map