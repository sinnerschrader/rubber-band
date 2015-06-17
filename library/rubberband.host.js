'use strict';

var host = require('./').host;
var nodelistToArray = require('./utilities/nodelist-to-array');

var els = nodelistToArray(document.querySelectorAll('.js-rubberband'));
els.forEach(host);