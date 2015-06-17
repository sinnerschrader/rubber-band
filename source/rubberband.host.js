const host = require('./').host;
const nodelistToArray = require('./utilities/nodelist-to-array');

let els = nodelistToArray(document.querySelectorAll('.js-rubberband'));
els.forEach(host);
