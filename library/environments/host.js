'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _defaults = require('../defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function host(frame) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? _defaults2['default'] : arguments[1];

  var options = _extends({}, config, _defaults2['default']);

  var callback = options.callback || function defaultCallback(iframe, height) {
    if (iframe) {
      iframe.style.height = height + 'px';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9lbnZpcm9ubWVudHMvaG9zdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O3dCQUFxQixhQUFhOzs7O0FBRWxDLFNBQVMsSUFBSSxDQUFFLEtBQUssRUFBcUI7TUFBbkIsTUFBTTs7QUFDMUIsTUFBTSxPQUFPLGdCQUFPLE1BQU0sd0JBQWMsQ0FBQTs7QUFFeEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxTQUFTLGVBQWUsQ0FBRSxNQUFNLEVBQUUsTUFBTSxFQUFFO0FBQzdFLFFBQUksTUFBTSxFQUFFO0FBQ1YsWUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQU0sTUFBTSxPQUFJLENBQUE7S0FDcEM7R0FDRixDQUFBOztBQUVELFdBQVMsU0FBUyxDQUFFLENBQUMsRUFBRTtBQUNyQixRQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDaEMsYUFBTTtLQUNQOztBQUVELFFBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLEVBQUUsRUFBRTtBQUMxQixhQUFNO0tBQ1A7O0FBRUQsVUFBTSxDQUFDLHFCQUFxQixDQUFDLFlBQU07QUFDakMsY0FBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0tBQy9CLENBQUMsQ0FBQTtHQUNIOztBQUVELFdBQVMsT0FBTyxHQUFJO0FBQ2xCLFNBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0FBQzlCLFVBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtBQUNsQixRQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7S0FDYixFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtHQUNuQjs7QUFFRCxXQUFTLElBQUksR0FBSTtBQUNmLFFBQUksR0FBRyxHQUFHLEVBQUMsS0FBSyxFQUFMLEtBQUssRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUMsQ0FBQTtBQUNoQyxVQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0FBQ2hELFdBQU8sR0FBRyxDQUFBO0dBQ1g7O0FBRUQsV0FBUyxLQUFLLEdBQUk7QUFDaEIsUUFBSSxHQUFHLEdBQUcsRUFBQyxLQUFLLEVBQUwsS0FBSyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsT0FBTyxFQUFQLE9BQU8sRUFBQyxDQUFBO0FBQ2hDLFVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQ3BELFdBQU8sR0FBRyxDQUFBO0dBQ1g7O0FBRUQsU0FBTyxLQUFLLEVBQUUsQ0FBQTtDQUNmOztxQkFFYyxJQUFJIiwiZmlsZSI6Imhvc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi4vZGVmYXVsdHMnXG5cbmZ1bmN0aW9uIGhvc3QgKGZyYW1lLCBjb25maWcgPSBkZWZhdWx0cykge1xuICBjb25zdCBvcHRpb25zID0gey4uLmNvbmZpZywgLi4uZGVmYXVsdHN9XG5cbiAgY29uc3QgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrIHx8IGZ1bmN0aW9uIGRlZmF1bHRDYWxsYmFjayAoaWZyYW1lLCBoZWlnaHQpIHtcbiAgICBpZiAoaWZyYW1lKSB7XG4gICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YFxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTWVzc2FnZSAoZSkge1xuICAgIGlmIChlLmRhdGEudHlwZSAhPT0gb3B0aW9ucy5uYW1lKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoZS5kYXRhLmlkICE9PSBmcmFtZS5pZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBjYWxsYmFjayhmcmFtZSwgZS5kYXRhLmhlaWdodClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVxdWVzdCAoKSB7XG4gICAgZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiBvcHRpb25zLm5hbWUsXG4gICAgICBpZDogZnJhbWUuaWRcbiAgICB9LCBvcHRpb25zLmRvbWFpbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AgKCkge1xuICAgIGxldCBhcGkgPSB7c3RhcnQsIHN0b3AsIHJlcXVlc3R9XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpXG4gICAgcmV0dXJuIGFwaVxuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQgKCkge1xuICAgIGxldCBhcGkgPSB7c3RhcnQsIHN0b3AsIHJlcXVlc3R9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UsIGZhbHNlKVxuICAgIHJldHVybiBhcGlcbiAgfVxuXG4gIHJldHVybiBzdGFydCgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGhvc3RcbiJdfQ==