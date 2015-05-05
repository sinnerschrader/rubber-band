import defaults from '../defaults';
import objectAssign from 'object-assign';

function host (frame, config = defaults) {
	const options = objectAssign({}, config, defaults);
	const callback = options.callback || function defaultCallback (iframe, height) {
		if (iframe) {
			iframe.style.height = `${height}px`;
		}
	};

	function onMessage (e) {
		if (e.data.type !== options.name) {
			return;
		}

		if (e.data.id !== frame.id) {
			return;
		}

		window.requestAnimationFrame(() => {
			callback(frame, e.data.height);
		});
	}

	function request () {
		frame.contentWindow.postMessage({
			type: options.name,
			id: frame.id
		}, options.domain);
	}

	function stop () {
		let api = {start, stop, request};
		window.removeEventListener('message', onMessage);
		return api;
	}

	function start () {
		let api = {start, stop, request};
		window.addEventListener('message', onMessage, false);
		return api;
	}

	return start();
}

export default host;
