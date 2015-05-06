'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function content() {
	var config = arguments[0] === undefined ? _defaults2['default'] : arguments[0];

	var measurementElements = [document.documentElement, document.body];
	var measurementMethods = ['scrollHeight', 'offsetHeight', 'clientHeight'];

	var options = _objectAssign2['default']({}, config, _defaults2['default']);

	var observer = null;

	function getHeight() {
		var measurements = [];

		measurementElements.forEach(function measureElement(element) {
			measurementMethods.forEach(function applyMeasure(method) {
				measurements.push(element[method]);
			});
		});

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