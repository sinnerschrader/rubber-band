import defaults from '../defaults';

function host (frame, config = defaults) {
	const options = Object.assign({}, config, defaults);
	const callback = options.callback || function defaultCallback (height) {
		frame.styles.height = `${height}px`;
	};

	function onMessage (e) {
		if (e.data.type !== options.name) {
			return;
		}

		if (e.data.id !== options.name) {
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

	start();
}

export default host;
