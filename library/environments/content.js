'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var measurementElements = [document.documentElement, document.body];
var measurementMethods = ['scrollHeight', 'offsetHeight', 'clientHeight'];

function content() {
	var config = arguments[0] === undefined ? _defaults2['default'] : arguments[0];

	var options = Object.assign({}, config, _defaults2['default']);
	var observer = null;

	function getHeight() {
		var measurements = [];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = measurementElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var element = _step.value;
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = measurementMethods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var method = _step2.value;

						measurements.push(element[method]);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return Math.max.apply(Math, measurements);
	}

	function send() {
		window.parent.postMessage({
			type: options.name,
			height: getHeight(),
			id: window.frameElement.id
		}, options.domain);
	}

	var throttledSend = _lodashThrottle2['default'](send, options.throttle);

	function onMessage(e) {
		if (e.data.type !== options.name) {
			return;
		}

		if (e.data.id !== window.frameElement.id) {
			return;
		}

		throttledSend(e);
	}

	function stop() {
		var api = { observer: observer, stop: stop, start: start };

		window.removeEventListener('message', onMessage);
		window.removeEventListener('load', throttledSend);
		window.removeEventListener('resize', throttledSend);
		document.body.removeEventListener('transitionend', throttledSend);

		if (!observer) {
			return api;
		}

		observer.disconnect();

		return api;
	}

	function start() {
		var api = { observer: observer, stop: stop, start: start };

		if (!('frameElement' in window)) {
			return api;
		}

		if (!('parent' in window)) {
			return api;
		}

		if (!('postMessage' in window.parent)) {
			return api;
		}

		window.addEventListener('message', onMessage);
		window.addEventListener('load', throttledSend);
		window.addEventListener('resize', throttledSend);
		document.body.addEventListener('transitionend', throttledSend);

		if (!('MutationObserver' in window)) {
			return api;
		}

		observer = observer || new window.MutationObserver(throttledSend);

		observer.observe(document.body, {
			childList: true,
			attributes: true,
			characterData: true,
			subtree: true
		});

		return api;
	}

	return start();
}

exports['default'] = content;
module.exports = exports['default'];