'use strict';

var _rubberband = require('./rubberband');

var els = document.querySelectorAll('.js-rubberband');
Array.prototype.slice.call(els).forEach(_rubberband.host);