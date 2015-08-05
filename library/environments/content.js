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

  var measurementElements = [document.documentElement, document.body];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbnZpcm9ubWVudHMvY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs4QkFBcUIsaUJBQWlCOzs7OzRCQUVzQyxpQkFBaUI7O3dCQUN4RSxhQUFhOzs7O0FBRWxDLFNBQVMsT0FBTyxHQUFxQjtNQUFuQixNQUFNOztBQUN0QixNQUFNLG1CQUFtQixHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDckUsTUFBTSxvQkFBb0IsR0FBRyxlQUx2QixtQkFBbUIsZ0JBQUUsbUJBQW1CLGdCQUFFLG1CQUFtQixDQUt5QixDQUFBOztBQUU1RixNQUFNLE9BQU8sdUNBQW9CLE1BQU0sQ0FBQyxDQUFBOztBQUV4QyxNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUE7O0FBRW5CLFdBQVMsU0FBUyxHQUFJO0FBQ3BCLFFBQUksWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxTQUFTLGNBQWMsQ0FBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQ3ZGLFVBQUksbUJBQW1CLEdBQUcsb0JBQW9CLENBQzNDLEdBQUcsQ0FBQyxTQUFTLGdCQUFnQixDQUFFLG1CQUFtQixFQUFFO0FBQ25ELGVBQU8sbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUE7T0FDcEMsQ0FBQyxDQUNELE1BQU0sQ0FBQyxVQUFBLFdBQVc7ZUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXO09BQUEsQ0FBQyxDQUFBOztBQUU1RCwwQ0FBVyxPQUFPLHNCQUFLLG1CQUFtQixHQUFDO0tBQzVDLEVBQUUsRUFBRSxDQUFDLENBQUE7O0FBRU4sV0FBTyxJQUFJLENBQUMsR0FBRyxNQUFBLENBQVIsSUFBSSxxQkFBUSxZQUFZLEVBQUMsQ0FBQTtHQUNqQzs7QUFFRCxXQUFTLElBQUksR0FBSTtBQUNmLFFBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3hCLGFBQU07S0FDUDs7QUFFRCxVQUFNLENBQUMs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QUFhLEVBQUUsSUFBSTtBQUNuQixhQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMsQ0FBQTs7QUFFRixXQUFPLEdBQUcsQ0FBQTtHQUNYOztBQUVELFNBQU8sS0FBSyxFQUFFLENBQUE7Q0FDZjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC50aHJvdHRsZSdcblxuaW1wb3J0IHttZWFzdXJlU2Nyb2xsSGVpZ2h0LCBtZWFzdXJlQ2xpZW50SGVpZ2h0LCBtZWFzdXJlT2Zmc2V0SGVpZ2h0fSBmcm9tICcuLi9tZWFzdXJlbWVudHMnXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMnXG5cbmZ1bmN0aW9uIGNvbnRlbnQgKGNvbmZpZyA9IGRlZmF1bHRzKSB7XG4gIGNvbnN0IG1lYXN1cmVtZW50RWxlbWVudHMgPSBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XVxuICBjb25zdCBtZWFzdXJlbWVudEZ1bmN0aW9ucyA9IFttZWFzdXJlU2Nyb2xsSGVpZ2h0LCBtZWFzdXJlQ2xpZW50SGVpZ2h0LCBtZWFzdXJlT2Zmc2V0SGVpZ2h0XVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7Li4uZGVmYXVsdHMsIC4uLmNvbmZpZ31cblxuICB2YXIgb2JzZXJ2ZXIgPSBudWxsXG5cbiAgZnVuY3Rpb24gZ2V0SGVpZ2h0ICgpIHtcbiAgICBsZXQgbWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24gbWVhc3VyZUVsZW1lbnQgKHJlc3VsdHMsIGVsZW1lbnQpIHtcbiAgICAgIGxldCBlbGVtZW50TWVhc3VyZW1lbnRzID0gbWVhc3VyZW1lbnRGdW5jdGlvbnNcbiAgICAgICAgLm1hcChmdW5jdGlvbiBhcHBseU1lYXN1cmVtZW50IChtZWFzdXJlbWVudEZ1bmN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG1lYXN1cmVtZW50RnVuY3Rpb24oZWxlbWVudClcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihtZWFzdXJlbWVudCA9PiB0eXBlb2YgbWVhc3VyZW1lbnQgIT09ICd1bmRlZmluZWQnKVxuXG4gICAgICByZXR1cm4gWy4uLnJlc3VsdHMsIC4uLmVsZW1lbnRNZWFzdXJlbWVudHNdXG4gICAgfSwgW10pXG5cbiAgICByZXR1cm4gTWF0aC5tYXgoLi4ubWVhc3VyZW1lbnRzKVxuICB9XG5cbiAgZnVuY3Rpb24gc2VuZCAoKSB7XG4gICAgaWYgKCF3aW5kb3cuZnJhbWVFbGVtZW50KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6IG9wdGlvbnMubmFtZSxcbiAgICAgIGhlaWdodDogZ2V0SGVpZ2h0KCksXG4gICAgICBpZDogd2luZG93LmZyYW1lRWxlbWVudC5pZFxuICAgIH0sXG4gICAgb3B0aW9ucy5kb21haW4pXG4gIH1cblxuICBjb25zdCB0aHJvdHRsZWRTZW5kID0gdGhyb3R0bGUoc2VuZCwgb3B0aW9ucy50aHJvdHRsZSlcblxuICBmdW5jdGlvbiBvbk1lc3NhZ2UgKGUpIHtcbiAgICBpZiAoZS5kYXRhLnR5cGUgIT09IG9wdGlvbnMubmFtZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCF3aW5kb3cuZnJhbWVFbGVtZW50IHx8IGUuZGF0YS5pZCAhPT0gd2luZG93LmZyYW1lRWxlbWVudC5pZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhyb3R0bGVkU2VuZChlKVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCAoKSB7XG4gICAgbGV0IGFwaSA9IHtvYnNlcnZlciwgc3RvcCwgc3RhcnR9XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSlcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRocm90dGxlZFNlbmQpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZFNlbmQpXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhyb3R0bGVkU2VuZClcblxuICAgIGlmICghb2JzZXJ2ZXIpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICB9XG5cbiAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcblxuICAgIHJldHVybiBhcGlcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0ICgpIHtcbiAgICBsZXQgYXBpID0ge29ic2VydmVyLCBzdG9wLCBzdGFydH1cblxuICAgIGlmICghKCdmcmFtZUVsZW1lbnQnIGluIHdpbmRvdykpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICB9XG5cbiAgICBpZiAoISgncGFyZW50JyBpbiB3aW5kb3cpKSB7XG4gICAgICByZXR1cm4gYXBpXG4gICAgfVxuXG4gICAgaWYgKCEoJ3Bvc3RNZXNzYWdlJyBpbiB3aW5kb3cucGFyZW50KSkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgIH1cblxuICAgIGlmICghKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgICByZXR1cm4gYXBpXG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCB0aHJvdHRsZWRTZW5kKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZWRTZW5kKVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHRocm90dGxlZFNlbmQpXG5cbiAgICBpZiAoISgnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KSkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgIH1cblxuICAgIG9ic2VydmVyID0gb2JzZXJ2ZXIgfHwgbmV3IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKHRocm90dGxlZFNlbmQpXG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXBpXG4gIH1cblxuICByZXR1cm4gc3RhcnQoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnRcbiJdfQ==