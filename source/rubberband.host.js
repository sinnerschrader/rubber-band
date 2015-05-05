import {host} from './';

let els = document.querySelectorAll('.js-rubberband');
Array.prototype.slice.call(els).forEach(host);
