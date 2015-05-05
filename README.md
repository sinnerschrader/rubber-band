rubberband
----------
Unapologetically evergreen-only supporting iframe resizer


### Usage
#### 1. Browserify
* Install via npm `npm install --save rubberband`

* In your host document

```javascript
// content.js
import {content} from 'rubberband';
content();
```

* In your embedded document

```javascript
// host.js
import {host} from 'rubberband';

let els = document.querySelectorAll('.js-rubberband');
let frames = Array.prototype.slice.call(els).map(host);
```

#### 2. Plain old javascript files
* In your host document

```html
<body>
	<!-- host.html -->
	<iframe src="./content.html" class="js-rubberband">
	<script src="rubberband/library/rubberband.host.js" async="async"></script>
</body>
```

* In your embedded document

```html
<body>
	<!-- content.html -->
	<script src="rubberband/library/rubberband.content.js" async="async"></script>
</body>
```

### API
* `rubberband.host(frame /* frame element */, options /* options object */);`

```javascript
	{
		"name": "rubberband", // Name used for signaling between frames
		"domain": "*",        // Domain parameter passed to window.postMessage
		"throttle": 300       // Throttle interval used to send messages in milliseconds
		"callback": function defaultCallback(frame, height) {
			// Called whenever receiving a message from iframe
			// Called with params
			// * height (integer): Height to apply to iframe
			// * frame (HTMLElement): iframe to apply the height to
			frame.styles.height = `${height}px`;
		}
	}
```
```javascript
	{
		start(),              // Start frame resizing
		stop(),               // Stop frame resizing
		request()             // Send a request for content height measurement to the containing iframe
	}
```

* `rubberband.content(options /* options object */);`

```javascript
	{
		"name": "rubberband", // Name used for signaling between frames
		"domain": "*",        // Domain parameter passed to window.postMessage
		"throttle": 300       // Throttle interval used to send messages in milliseconds
	}
```
```javascript
	{
		start(),              // Start frame resizing
		stop(),               // Stop frame resizing
	}
```
