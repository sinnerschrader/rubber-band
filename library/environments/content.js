'use strict';

var throttle = require('lodash.throttle');
var objectAssign = require('object-assign');

var defaults = require('../defaults');

function content() {
	var config = arguments[0] === undefined ? defaults : arguments[0];

	var measurementElements = [document.documentElement, document.body];
	var measurementMethods = ['scrollHeight', 'offsetHeight', 'clientHeight'];

	var options = objectAssign({}, config, defaults);

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
		if (!window.frameElement) {
			return;
		}

		window.parent.postMessage({
			type: options.name,
			height: getHeight(),
			id: window.frameElement.id
		}, options.domain);
	}

	var throttledSend = throttle(send, options.throttle);

	function onMessage(e) {
		if (e.data.type !== options.name) {
			return;
		}

		if (!window.frameElement || e.data.id !== window.frameElement.id) {
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

		if (!('addEventListener' in window)) {
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

module.exports = content;