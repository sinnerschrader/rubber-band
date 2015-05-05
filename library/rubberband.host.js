'use strict';

var _ = require('./');

var els = document.querySelectorAll('.js-rubberband');
Array.prototype.slice.call(els).forEach(_.host);