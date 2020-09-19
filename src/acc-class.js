import * as methods from './methods';
import * as events from './events';

const Acc = function(...args) {
    this.length = 0;
    this.add(...args);
  };

[methods, events].forEach((group) => {
  Object.keys(group).forEach((methodName) => {
    Acc.prototype[methodName] = group[methodName];
  });
});
export { Acc};
export default Acc;
