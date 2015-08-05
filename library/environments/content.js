'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function content() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? _defaults2['default'] : arguments[0];

  var measurementElements = [document.documentElement, document.body];
  var measurementMethods = ['scrollHeight', 'offsetHeight', 'clientHeight'];

  var options = _extends({}, _defaults2['default'], config);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbnZpcm9ubWVudHMvY29udGVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OEJBQXFCLGlCQUFpQjs7Ozt3QkFDakIsYUFBYTs7OztBQUVsQyxTQUFTLE9BQU8sR0FBcUI7TUFBbkIsTUFBTTs7QUFDdEIsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3JFLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQyxDQUFBOztBQUUzRSxNQUFNLE9BQU8sdUNBQW9CLE1BQU0sQ0FBQyxDQUFBOztBQUV4QyxNQUFJLFFBQVEsR0FBRyxJQUFJLENBQUE7O0FBRW5CLFdBQVMsU0FBUyxHQUFJO0FBQ3BCLFFBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQTs7QUFFckIsdUJBQW1CLENBQUMsT0FBTyxDQUFDLFNBQVMsY0FBYyxDQUFFLE9BQU8sRUFBRTtBQUM1RCx3QkFBa0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxZQUFZLENBQUUsTUFBTSxFQUFFO0FBQ3hELG9CQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO09BQ25DLENBQUMsQ0FBQTtLQUNILENBQUMsQ0FBQTs7QUFFRixXQUFPLElBQUksQ0FBQyxHQUFHLE1BQUEsQ0FBUixJQUFJLEVBQVEsWUFBWSxDQUFDLENBQUE7R0FDakM7O0FBRUQsV0FBUyxJQUFJLEdBQUk7QUFDZixRQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtBQUN4QixhQUFNO0tBQ1A7O0FBRUQsVUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDeEIsVUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLFlBQU0sRUFBRSxTQUFTLEVBQUU7QUFDbkIsUUFBRSxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtLQUMzQixFQUNELE9B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RyxPQUFPLENBQUEiLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMnXG5cbmZ1bmN0aW9uIGNvbnRlbnQgKGNvbmZpZyA9IGRlZmF1bHRzKSB7XG4gIGNvbnN0IG1lYXN1cmVtZW50RWxlbWVudHMgPSBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XVxuICBjb25zdCBtZWFzdXJlbWVudE1ldGhvZHMgPSBbJ3Njcm9sbEhlaWdodCcsICdvZmZzZXRIZWlnaHQnLCAnY2xpZW50SGVpZ2h0J11cblxuICBjb25zdCBvcHRpb25zID0gey4uLmRlZmF1bHRzLCAuLi5jb25maWd9XG5cbiAgdmFyIG9ic2VydmVyID0gbnVsbFxuXG4gIGZ1bmN0aW9uIGdldEhlaWdodCAoKSB7XG4gICAgbGV0IG1lYXN1cmVtZW50cyA9IFtdXG5cbiAgICBtZWFzdXJlbWVudEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gbWVhc3VyZUVsZW1lbnQgKGVsZW1lbnQpIHtcbiAgICAgIG1lYXN1cmVtZW50TWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uIGFwcGx5TWVhc3VyZSAobWV0aG9kKSB7XG4gICAgICAgIG1lYXN1cmVtZW50cy5wdXNoKGVsZW1lbnRbbWV0aG9kXSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHJldHVybiBNYXRoLm1heCguLi5tZWFzdXJlbWVudHMpXG4gIH1cblxuICBmdW5jdGlvbiBzZW5kICgpIHtcbiAgICBpZiAoIXdpbmRvdy5mcmFtZUVsZW1lbnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe1xuICAgICAgdHlwZTogb3B0aW9ucy5uYW1lLFxuICAgICAgaGVpZ2h0OiBnZXRIZWlnaHQoKSxcbiAgICAgIGlkOiB3aW5kb3cuZnJhbWVFbGVtZW50LmlkXG4gICAgfSxcbiAgICBvcHRpb25zLmRvbWFpbilcbiAgfVxuXG4gIGNvbnN0IHRocm90dGxlZFNlbmQgPSB0aHJvdHRsZShzZW5kLCBvcHRpb25zLnRocm90dGxlKVxuXG4gIGZ1bmN0aW9uIG9uTWVzc2FnZSAoZSkge1xuICAgIGlmIChlLmRhdGEudHlwZSAhPT0gb3B0aW9ucy5uYW1lKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXdpbmRvdy5mcmFtZUVsZW1lbnQgfHwgZS5kYXRhLmlkICE9PSB3aW5kb3cuZnJhbWVFbGVtZW50LmlkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aHJvdHRsZWRTZW5kKGUpXG4gIH1cblxuICBmdW5jdGlvbiBzdG9wICgpIHtcbiAgICBsZXQgYXBpID0ge29ic2VydmVyLCBzdG9wLCBzdGFydH1cblxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgb25NZXNzYWdlKVxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgdGhyb3R0bGVkU2VuZClcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkU2VuZClcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aHJvdHRsZWRTZW5kKVxuXG4gICAgaWYgKCFvYnNlcnZlcikge1xuICAgICAgcmV0dXJuIGFwaVxuICAgIH1cblxuICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuXG4gICAgcmV0dXJuIGFwaVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQgKCkge1xuICAgIGxldCBhcGkgPSB7b2JzZXJ2ZXIsIHN0b3AsIHN0YXJ0fVxuXG4gICAgaWYgKCEoJ2ZyYW1lRWxlbWVudCcgaW4gd2luZG93KSkge1xuICAgICAgcmV0dXJuIGFwaVxuICAgIH1cblxuICAgIGlmICghKCdwYXJlbnQnIGluIHdpbmRvdykpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICB9XG5cbiAgICBpZiAoISgncG9zdE1lc3NhZ2UnIGluIHdpbmRvdy5wYXJlbnQpKSB7XG4gICAgICByZXR1cm4gYXBpXG4gICAgfVxuXG4gICAgaWYgKCEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykpIHtcbiAgICAgIHJldHVybiBhcGlcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIHRocm90dGxlZFNlbmQpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZFNlbmQpXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhyb3R0bGVkU2VuZClcblxuICAgIGlmICghKCdNdXRhdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgICByZXR1cm4gYXBpXG4gICAgfVxuXG4gICAgb2JzZXJ2ZXIgPSBvYnNlcnZlciB8fCBuZXcgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIodGhyb3R0bGVkU2VuZClcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlXG4gICAgfSlcblxuICAgIHJldHVybiBhcGlcbiAgfVxuXG4gIHJldHVybiBzdGFydCgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGVudFxuIl19