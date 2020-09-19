import {acc} from './acc';
import {parseNode} from './events';
function splice(...args) {
    return Array.prototype.splice.apply(this, args);
  }

function forEach(...args) {
    Array.prototype.forEach.call(this, ...args);
    return this;
  }

function each(fn) {
    this["forEach"]((el, index) => {
        fn.call(el, index, el);
    });
    return this;
  }

function add(...args) {
    args.forEach(selector => {
      const nodeList = parseNode(selector);

      nodeList.forEach(node => {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === node) {
            return;
          }
        }
        this[this.length] = node;
        this.length++;
      });
    });

    return this;
  }

function focus() {
if(this.length) {
let i = this.length - 1;
this[i].focus();
}
    return this;
  }

function blur() {
if(this.length) {
let i = this.length - 1;
this[i].blur();
}
    return this;
  }

function click() {
		this["trigger"]('click');
		return this;
}

function attr(name, value) {
if(!value && typeof name === 'string') {
return this.length > 0 ? this[0].getAttribute(name) : '';
}
let attrs = {};
if(typeof name === 'string') {
attrs[name] = value;
} else {
attrs = name;
}
this["forEach"](function(el) {
for( let key in attrs) {
if(el.setAttribute) {
el.setAttribute(key, typeof attrs[key] === 'function' ? attrs[key].call(el) : attrs[key]);
}
}
});
    return this;
  }

function removeAttr(name) {
let attrs = [];
if(typeof name === 'string') {
attrs.push(name);
} else {
attrs = name;
}
this["forEach"](function(el) {
for(let i = 0, len = attrs.length; i < len; i++) {
el.removeAttribute(attrs[i]);
}
});
    return this;
  }

function addClass(className) {
let classNames = className.split(' ');
    this["forEach"](function(el) {
classNames.forEach(function(name) {
      el.classList && el.classList.add(name);
});
    });
    return this;
  }

function removeClass(className) {
    this["forEach"](function(el) {
      el.classList.remove(className);
    });
    return this;
  }

function html(html) {
if(typeof html === 'undefined') {
let rt = '';
this["forEach"](el => {
rt += el.innerHTML;
});
return rt;
}
this["forEach"](function(el) {
el.innerHTML = html;
});
return this;
  }

function text(text) {
if(typeof text === 'undefined') {
    let rt = '';
this["forEach"](el => {
rt += el.innerText;
});
return rt;
}
this["forEach"](function(el) {
el.innerText = text;
});
return this;
  }

function is(selector) {
  const el = this[0];
  let compareWith;
  let i;
  if (!el || typeof selector === 'undefined') return false;
  if (typeof selector === 'string') {
    if (el.matches) return el.matches(selector);
    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);

    compareWith = acc(selector);
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }
    return false;
  } else if (selector === document) return el === document;
  else if (selector === window) return el === window;

  if (selector.nodeType || selector instanceof acc) {
    compareWith = selector.nodeType ? acc(selector) : selector;
    for (i = 0; i < compareWith.length; i += 1) {
      if (compareWith[i] === el) return true;
    }
    return false;
  }
  return false;
};

function parent(selector) {
let v = acc();
  for (let i = 0; i < this.length; i += 1) {
    if (this[i].parentNode !== null) {
      if (selector) {
        if (acc(this[i].parentNode)["is"](selector)) v.add(this[i].parentNode);
      } else {
        v.add(this[i].parentNode);
      }
    }
  }
  return v;
  }

function parents(selector) {
  let parents = acc();
  for (let i = 0; i < this.length; i += 1) {
    let parent = this[i].parentNode;
    while (parent) {
      if (selector) {
        if (acc(parent)["is"](selector)) parents.add(parent);
      } else {
        parents.add(parent);
      }
      parent = parent.parentNode;
    }
  }
  return parents;
  }

function find(selector) {
let v = acc();
this["forEach"](function(el) {
el.nodeType && el.nodeType == 1 && v.add(el.querySelectorAll(selector));
    });
    return v;
  }

function filterByText(text) {
let v = acc();
this["forEach"](function(el) {
el.nodeType && el.nodeType == 1 && el.innerText.includes(text) && v.add(el);
    });
    return v;
  }

function append(newEl) {
this["forEach"](function(el) {
if(typeof newEl === 'string') {
el.insertAdjacentHTML('beforeend', newEl);
} else if(newEl instanceof Node) {
el.appendChild(newEl.cloneNode(true));
}
});
    return this;
  }

function filter(selector) {
let v = acc();
this["forEach"](function(el) {
if(typeof selector === 'function') {
if(selector(el)) {
v.add(el);
}
} else {
if(el.matches(selector)) {
v.add(el);
}
}
});
    return v;
  }

function not(selector) {
let v = acc();
this["forEach"](function(el) {
if(typeof selector === 'function') {
if(!selector(el)) {
v.add(el);
}
} else {
if(!el.matches(selector)) {
v.add(el);
}
}
});
    return v;
  }

function get(index) {
    if(this.length < 1) {
        return null;
    }
    if(index < 0) {
        index += this.length;
    }
    if(index > this.length) {
        index = this.length - 1;
    }
    return this[index];
  }

function eq(index) {
    return acc().add(this["get"](index));
  }

function first() {
  return this.eq(0);
 }

function last() {
  return this.eq(-1);
}




export {
splice,
forEach,
each,
add,
focus,
blur,
click,
attr,
removeAttr,
addClass,
removeClass,
html,
text,
is,
parent,
parents,
find,
append,
filter,
filterByText,
not,
get,
eq,
first,
last
};
