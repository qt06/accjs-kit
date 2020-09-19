import {Acc} from './acc-class';
import * as utils from './util';
import { version } from '../package.json';
  const acc = (...args) => new Acc(...args);
acc.version = version;

Object.keys(utils).forEach((methodName) => {
    acc[methodName] = utils[methodName];
  });
export {acc}
export default acc;
