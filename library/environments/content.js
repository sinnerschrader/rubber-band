'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _measurements = require('../measurements');

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function content() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? _defaults2['default'] : arguments[0];

  var measurementElements = [document.body, document.documentElement];
  var measurementFunctions = [_measurements.measureScrollHeight, _measurements.measureClientHeight, _measurements.measureOffsetHeight];

  var options = _extends({}, _defaults2['default'], config);

  var observer = null;

  function getHeight() {
    var measurements = measurementElements.reduce(function measureElement(results, element) {
      var elementMeasurements = measurementFunctions.map(function applyMeasurement(measurementFunction) {
        return measurementFunction(element);
      }).filter(function (measurement) {
        return typeof measurement !== 'undefined';
      });

      return [].concat(_toConsumableArray(results), _toConsumableArray(elementMeasurements));
    }, []);

    return Math.max.apply(Math, _toConsumableArray(measurements));
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

  var throttledSend = (0, _lodashThrottle2['default'])(send, options.throttle);

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

    // Disallow margin and padding on measurementElements
    measurementElements.forEach(function (measurementElement) {
      return measurementElement.style.margin = 0;
    });
    measurementElements.forEach(function (measurementElement) {
      return measurementElement.style.padding = 0;
    });

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbnZpcm9ubWVudHMvY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs4QkFBcUIsaUJBQWlCOzs7OzRCQUVzQyxpQkFBaUI7O3dCQUN4RSxhQUFhOzs7O0FBRWxDLFNBQVMsT0FBTyxHQUFxQjtNQUFuQixNQUFNOztBQUN0QixNQUFNLG1CQUFtQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUE7QUFDckUsTUFBTSxvQkFBb0IsR0FBRyxlQUx2QixtQkFBbUIsZ0JBQUUsbUJBQW1CLGdCQUFFLG1CQUFtQixDQUt5QixDQUFBOztBQUU1RixNQUFNLE9BQU8sdUNBQW9CLE1BQU0sQ0FBQyxDQUFBOztBQUV4QyxNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUE7O0FBRW5CLFdBQVMsU0FBUyxHQUFJO0FBQ3BCLFFBQUksWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLGNBQWMsQ0FBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZGLFVBQUksbUJBQW1CLEdBQUcsb0JBQW9CLENBQzNDLEdBQUcsQ0FBQyxTQUFTLGdCQUFnQixDQUFFLG1CQUFtQixFQUFFO0FBQ25ELGVBQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUE7T0FDcEMsQ0FBQyxDQUNELE1BQU0sQ0FBQyxVQUFBLFdBQVc7ZUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXO09BQUEsQ0FBQyxDQUFBOztBQUU1RCwwQ0FBVyxPQUFPLHNCQUFLLG1CQUFtQixHQUFDO0tBQzVDLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRU4sV0FBTyxJQUFJLENBQUMsR0FBRyxNQUFBLENBQVIsSUFBSSxxQkFBUSxZQUFZLEVBQUMsQ0FBQTtHQUNqQzs7QUFFRCxXQUFTLElBQUksR0FBSTtBQUNmLFFBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3hCLGFBQU07S0FDUDs7QUFFRCxVQUFNLENBQUMs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RUFBRTtBQUNuQyxhQUFPLEdBQUcsQ0FBQTtLQUNYOztBQUVELFlBQVEsR0FBRyxRQUFRLElBQUksSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUE7O0FBRWpFLFlBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtBQUM5QixlQUFTLEVBQUUsSUFBSTtBQUNmLGdCQUFVLEVBQUUsSUFBSTtBQUNoQixtQkFBYSxFQUFFLElBQUk7QUFDbkIsYUFBTyxFQUFFLElBQUk7S0FDZCxDQUFDLENBQUE7O0FBRUYsV0FBTyxHQUFHLENBQUE7R0FDWDs7QUFFRCxTQUFPLEtBQUssRUFBRSxDQUFBO0NBQ2Y7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUEiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnXG5cbmltcG9ydCB7bWVhc3VyZVNjcm9sbEhlaWdodCwgbWVhc3VyZUNsaWVudEhlaWdodCwgbWVhc3VyZU9mZnNldEhlaWdodH0gZnJvbSAnLi4vbWVhc3VyZW1lbnRzJ1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzJ1xuXG5mdW5jdGlvbiBjb250ZW50IChjb25maWcgPSBkZWZhdWx0cykge1xuICBjb25zdCBtZWFzdXJlbWVudEVsZW1lbnRzID0gW2RvY3VtZW50LmJvZHksIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudF1cbiAgY29uc3QgbWVhc3VyZW1lbnRGdW5jdGlvbnMgPSBbbWVhc3VyZVNjcm9sbEhlaWdodCwgbWVhc3VyZUNsaWVudEhlaWdodCwgbWVhc3VyZU9mZnNldEhlaWdodF1cblxuICBjb25zdCBvcHRpb25zID0gey4uLmRlZmF1bHRzLCAuLi5jb25maWd9XG5cbiAgdmFyIG9ic2VydmVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGdldEhlaWdodCAoKSB7XG4gICAgbGV0IG1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50RWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uIG1lYXN1cmVFbGVtZW50IChyZXN1bHRzLCBlbGVtZW50KSB7XG4gICAgICBsZXQgZWxlbWVudE1lYXN1cmVtZW50cyA9IG1lYXN1cmVtZW50RnVuY3Rpb25zXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gYXBwbHlNZWFzdXJlbWVudCAobWVhc3VyZW1lbnRGdW5jdGlvbikge1xuICAgICAgICAgIHJldHVybiBtZWFzdXJlbWVudEZ1bmN0aW9uKGVsZW1lbnQpXG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIobWVhc3VyZW1lbnQgPT4gdHlwZW9mIG1lYXN1cmVtZW50ICE9PSAndW5kZWZpbmVkJylcblxuICAgICAgcmV0dXJuIFsuLi5yZXN1bHRzLCAuLi5lbGVtZW50TWVhc3VyZW1lbnRzXVxuICAgIH0sIFtdKVxuXG4gICAgcmV0dXJuIE1hdGgubWF4KC4uLm1lYXN1cmVtZW50cylcbiAgfVxuXG4gIGZ1bmN0aW9uIHNlbmQgKCkge1xuICAgIGlmICghd2luZG93LmZyYW1lRWxlbWVudCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBvcHRpb25zLm5hbWUsXG4gICAgICBoZWlnaHQ6IGdldEhlaWdodCgpLFxuICAgICAgaWQ6IHdpbmRvdy5mcmFtZUVsZW1lbnQuaWRcbiAgICB9LFxuICAgIG9wdGlvbnMuZG9tYWluKVxuICB9XG5cbiAgY29uc3QgdGhyb3R0bGVkU2VuZCA9IHRocm90dGxlKHNlbmQsIG9wdGlvbnMudGhyb3R0bGUpXG5cbiAgZnVuY3Rpb24gb25NZXNzYWdlIChlKSB7XG4gICAgaWYgKGUuZGF0YS50eXBlICE9PSBvcHRpb25zLm5hbWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghd2luZG93LmZyYW1lRWxlbWVudCB8fCBlLmRhdGEuaWQgIT09IHdpbmRvdy5mcmFtZUVsZW1lbnQuaWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRocm90dGxlZFNlbmQoZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKCkge1xuICAgIGxldCBhcGkgPSB7b2JzZXJ2ZXIsIHN0b3AsIHN0YXJ0fVxuXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aHJvdHRsZWRTZW5kKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZWRTZW5kKVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRocm90dGxlZFNlbmQpXG5cbiAgICBpZiAoIW9ic2VydmVyKSB7XG4gICAgICByZXR1cm4gYXBpXG4gICAgfVxuXG4gICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG5cbiAgICByZXR1cm4gYXBpXG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCAoKSB7XG4gICAgbGV0IGFwaSA9IHtvYnNlcnZlciwgc3RvcCwgc3RhcnR9XG5cbiAgICBpZiAoISgnZnJhbWVFbGVtZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgICByZXR1cm4gYXBpXG4gICAgfVxuXG4gICAgaWYgKCEoJ3BhcmVudCcgaW4gd2luZG93KSkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgIH1cblxuICAgIGlmICghKCdwb3N0TWVzc2FnZScgaW4gd2luZG93LnBhcmVudCkpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICB9XG5cbiAgICBpZiAoISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgIH1cblxuICAgIC8vIERpc2FsbG93IG1hcmdpbiBhbmQgcGFkZGluZyBvbiBtZWFzdXJlbWVudEVsZW1lbnRzXG4gICAgbWVhc3VyZW1lbnRFbGVtZW50cy5mb3JFYWNoKG1lYXN1cmVtZW50RWxlbWVudCA9PiBtZWFzdXJlbWVudEVsZW1lbnQuc3R5bGUubWFyZ2luID0gMClcbiAgICBtZWFzdXJlbWVudEVsZW1lbnRzLmZvckVhY2gobWVhc3VyZW1lbnRFbGVtZW50ID0+IG1lYXN1cmVtZW50RWxlbWVudC5zdHlsZS5wYWRkaW5nID0gMClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgdGhyb3R0bGVkU2VuZClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkU2VuZClcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aHJvdHRsZWRTZW5kKVxuXG4gICAgaWYgKCEoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICB9XG5cbiAgICBvYnNlcnZlciA9IG9ic2VydmVyIHx8IG5ldyB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcih0aHJvdHRsZWRTZW5kKVxuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIGFwaVxuICB9XG5cbiAgcmV0dXJuIHN0YXJ0KClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50XG4iXX0=