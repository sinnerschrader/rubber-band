'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function host(frame) {
	var config = arguments[1] === undefined ? _defaults2['default'] : arguments[1];

	var options = _objectAssign2['default']({}, config, _defaults2['default']);
	var callback = options.callback || function defaultCallback(iframe, height) {
		if (iframe) {
			iframe.style.height = '' + height + 'px';
		}
	};

	function onMessage(e) {
		if (e.data.type !== options.name) {
			return;
		}

		if (e.data.id !== frame.id) {
			return;
		}

		window.requestAnimationFrame(function () {
			callback(frame, e.data.height);
		});
	}

	function request() {
		frame.contentWindow.postMessage({
			type: options.name,
			id: frame.id
		}, options.domain);
	}

	function stop() {
		var api = { start: start, stop: stop, request: request };
		window.removeEventListener('message', onMessage);
		return api;
	}

	function start() {
		var api = { start: start, stop: stop, request: request };
		window.addEventListener('message', onMessage, false);
		return api;
	}

	return start();
}

exports['default'] = host;
module.exports = exports['default'];