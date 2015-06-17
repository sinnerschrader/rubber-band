'use strict';

var defaults = require('../defaults');
var objectAssign = require('object-assign');

function host(frame) {
	var config = arguments[1] === undefined ? defaults : arguments[1];

	var options = objectAssign({}, config, defaults);
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

module.exports = host;