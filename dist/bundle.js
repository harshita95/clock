/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _alarmClock = __webpack_require__(1);

var clock = void 0,
    time = void 0,
    hoursField = void 0,
    minutesField = void 0,
    messageField = void 0,
    boxField = void 0,
    repeatField = void 0,
    alarmButton = void 0;

function formatTime(i) {
    i = parseInt(i, 10);
    return i < 10 ? "0" + i : i;
}

function showTime() {
    var h = formatTime(clock.date.getHours()),
        m = formatTime(clock.date.getMinutes()),
        s = formatTime(clock.date.getSeconds());
    time.innerText = h + ":" + m + ":" + s;

    setTimeout(function () {
        showTime();
    }, 1000);
};

function ringAlarm() {
    var h = formatTime(clock.date.getHours()),
        m = formatTime(clock.date.getMinutes()),
        message = void 0;
    message = clock.getAlarm(h, m);
    if (message) {
        window.alert(message);
    }
    setTimeout(function () {
        ringAlarm();
    }, 60000);
};

function validateAlarm(hours, minutes) {
    console.log(hours + " " + minutes);
    if (isInt(hours) && isInt(minutes)) {
        return true;
    }
    console.log("Invalid Alarm");
    return false;
}

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function saveAlarm() {
    var hours = void 0,
        minutes = void 0,
        message = void 0,
        repeat = void 0;
    hours = hoursField.value;
    minutes = minutesField.value;
    if (validateAlarm(hours, minutes)) {
        hours = formatTime(hours);
        minutes = formatTime(minutes);

        message = messageField.value;
        repeat = repeatField.checked ? true : false;
        clock.setAlarm(hours, minutes, message, repeat);
        displayAlarms();
    }
};

function displayAlarms() {
    var html = "<table border='1' class='alarms'>",
        i;
    html += "<tr>";
    html += "<th>Hours</th>";
    html += "<th>Minutes</th>";
    html += "<th>Message</th>";
    html += "</tr>";
    html += "<tr>";
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = clock.alarms.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var alarm = clock.alarms.get(key);
            html += "<td>" + alarm.hours + "</td>";
            html += "<td>" + alarm.minutes + "</td>";
            html += "<td>" + alarm.message + "</td>";
            html += "</tr>";
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    html += "</table>";
    boxField.innerHTML = html;
};

function onLoad() {

    clock = new _alarmClock.AlarmClock(new Date()), time = document.querySelector('.time'), hoursField = document.querySelector(".hours"), minutesField = document.querySelector(".minutes"), messageField = document.querySelector(".message"), repeatField = document.querySelector(".repeat"), alarmButton = document.querySelector(".setAlarm"), boxField = document.querySelector(".box");

    clock.updateTime();
    alarmButton.addEventListener('click', saveAlarm);
    showTime();
    ringAlarm();
}

window.addEventListener('load', onLoad, false);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AlarmClock = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clock = __webpack_require__(2);

var _alarm = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AlarmClock = exports.AlarmClock = function (_Clock) {
    _inherits(AlarmClock, _Clock);

    function AlarmClock(date) {
        _classCallCheck(this, AlarmClock);

        var _this = _possibleConstructorReturn(this, (AlarmClock.__proto__ || Object.getPrototypeOf(AlarmClock)).call(this, date));

        _this.alarms = new Map();
        return _this;
    }

    _createClass(AlarmClock, [{
        key: "setAlarm",
        value: function setAlarm(hours, minutes, message, repeat) {
            var newAlarm = void 0,
                that = this;

            newAlarm = new _alarm.Alarm(hours, minutes, message, repeat);
            var key = hours + minutes;
            this.alarms.set(key, newAlarm);
        }
    }, {
        key: "getAlarm",
        value: function getAlarm(hours, minutes) {
            var key = hours + minutes;
            if (this.alarms.has(key)) {
                var alarm = this.alarms.get(key);
                if (alarm.repeat === false) {
                    this.alarms.delete(key);
                }
                return alarm.message;
            }
            return false;
        }
    }]);

    return AlarmClock;
}(_clock.Clock);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Clock = exports.Clock = function () {
    function Clock(date) {
        _classCallCheck(this, Clock);

        this._date = date;
    }

    _createClass(Clock, [{
        key: "updateTime",
        value: function updateTime() {
            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

            this._date = date;
            setTimeout(this.updateTime.bind(this), 1000);
        }
    }, {
        key: "date",
        get: function get() {
            return this._date;
        },
        set: function set(date) {
            this._date = date;
        }
    }]);

    return Clock;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alarm = exports.Alarm = function () {
    function Alarm(hours, minutes, message, repeat) {
        _classCallCheck(this, Alarm);

        this._hours = hours;
        this._minutes = minutes;
        this._message = message || "Wake Up";
        this._repeat = repeat;
    }

    _createClass(Alarm, [{
        key: "hours",
        get: function get() {
            return this._hours;
        }
    }, {
        key: "minutes",
        get: function get() {
            return this._minutes;
        }
    }, {
        key: "message",
        get: function get() {
            return this._message;
        }
    }, {
        key: "repeat",
        get: function get() {
            return this._repeat;
        }
    }]);

    return Alarm;
}();

/***/ })
/******/ ]);