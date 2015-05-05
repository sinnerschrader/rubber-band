import {host} from './rubberband';

let els = document.querySelectorAll('.js-rubberband');
Array.prototype.slice.call(els).forEach(host);
