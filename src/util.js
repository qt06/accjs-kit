import globalEval from './DOMEval';
import {acc} from './acc';
function isVisible(t) { //author by veg
//return !!((t.tabIndex >= 0 || t.hasAttribute && t.hasAttribute('tabindex') && t.getAttribute('tabindex') == '-1') &&
return !!(!t.hasAttribute('disabled') &&
t.getAttribute('aria-hidden') !== 'true' &&
t.offsetParent !== null);
}


/**
function toFocus(focusSelector, op, rangeSelector) {
let els = document.querySelectorAll(rangeSelector);
let len = els.length;
let ae = document.activeElement;
let aeIndex = 0 ,index = 0;
for(let i = 0; i < len; i++) {
if(els[i] == ae) {
aeIndex = index = i;
break;
}
}
let i = op == '+' ? index + 1 : index - 1;
while(i != aeIndex) {
if(els[i].classList.contains(focusSelector) && isVisible(els[i])) {
index = i;
break;
}
i = op == '+' ? i + 1 : i - 1;
if(i >= len) {
i = 0;
}
if(i < 0) {
i = len -1;
}
}
if(index == aeIndex) {
//document.title = index;
//return;
}
let el = els[index];
let tagName = el.tagName.toLowerCase();
let pels = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'form', 'img', 'nav', 'header', 'main', 'footer', 'section', 'aside'];
if(pels.includes(tagName) || (tagName == 'a' && !el.hasAttribute('href'))) {
if(!el.hasAttribute('tabindex')) {
el.setAttribute('tabindex', '-1');
}
}
el.focus();
}

function nextFocus(focusSelector, rangeSelector= '*') {
toFocus(focusSelector, '+', rangeSelector);
}

function previousFocus(focusSelector, rangeSelector= '*') {
toFocus(focusSelector, '-', rangeSelector);
}


function registerHotkeys(accesskeys) {
accesskeys.forEach(function(a) {
if(typeof a["accesskey"] === 'undefined') {
return;
}
let focusSelector = 'accesskey-' + a["accesskey"].replace(/\+/g, '-');
let op = a["toward"] == "next" ? "+" : "-";
let rangeSelector = a["range"] == 'all' ? '*' : a.selector;
acc(a["selector"])["addClass"](focusSelector);
Mousetrap.bind(a["accesskey"], function() {
toFocus(focusSelector, op, rangeSelector);
return false;
});
});
}
*/
function gi(i, len, op) {
  let n = op == '+' ? +1 : -1;
  i = i + n;
  if (i >= len) {
    i = 0;
  }
  if (i < 0) {
    i = len - 1;
  }
  return i;
}

function _toFocus(el) {
  let tagName = el.tagName.toLowerCase();
  let tagNames = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'form', 'img', 'nav', 'header', 'main', 'footer', 'section', 'aside'];
  if (tagNames.includes(tagName) || (tagName == 'a' && !el.hasAttribute('href'))) {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '-1');
    }
  }
  el.focus();
}

function toFocus(focusSelector, op) {
  let els = [...document.body.querySelectorAll('*')];
  let len = els.length;
  let aeIndex = Math.max(0, els.indexOf(document.activeElement));
  let i = aeIndex == 0 ? 0 : gi(aeIndex, len, op);
  do {
    if (els[i].matches(focusSelector) && isVisible(els[i])) {
      _toFocus(els[i]);
      break;
    }
    i = gi(i, len, op);
  } while ( i != aeIndex );
}

function nextFocus(selector) {
  toFocus(selector, '+');
}

function previousFocus(selector) {
  toFocus(selector, '-');
}


export {
globalEval,
isVisible,
toFocus,
nextFocus,
previousFocus
}
