import Ember from 'ember';
import select from './select';

const {
  assert,
  typeOf,
  isNone,
  set
} = Ember;

export default function mutate(obj, path, value) {
  assert(`mutate must be called with 3 arguments`, arguments.length === 3);
  assert(`mutate must be called with 1st argument as an object or an array`, typeOf(obj) === 'object' || typeOf(obj) === 'array');
  assert(`mutate must be called with a string key`, typeOf(path) === 'string');

  let [ parent, selected, targetKey, index ] = select(obj, path);

  if (isNone(index)) {
    set(parent, targetKey, value);
  }

  if (!isNone(index)) {
    let target = [].concat(selected);
    target[index] = value;
    set(parent, targetKey, target);
  }
}