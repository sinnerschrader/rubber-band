'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _environmentsContent = require('./environments/content');

var _environmentsContent2 = _interopRequireDefault(_environmentsContent);

var _environmentsHost = require('./environments/host');

var _environmentsHost2 = _interopRequireDefault(_environmentsHost);

exports['default'] = { content: _environmentsContent2['default'], host: _environmentsHost2['default'] };
module.exports = exports['default'];