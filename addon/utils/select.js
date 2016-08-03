import Ember from 'ember';

const {
  isNone,
  assert,
  get,
  Logger: { info },
  typeOf
} = Ember;

export default function select(obj, path = '') {
  let parts = path.split('.');
  let targetPath = parts.pop();
  let last = obj;

  for (let i = 0; i < parts.length; i++) {
    let [ key, index ] = parse(parts[i]);
    assert(`Must exist ${key} in ${path} of`, obj);
    last = get(last, key);

    if (isObject(last)) {
      assert(`Objects must not receive index. Use ${key}.${index} instead of ${key}[${index}]`, isNone(index));
    }

    if (isArray(last)) {
      if (!isNone(index)) {
        last = last[index];
      } else {
        info(`Could not retrieve ${key}[${index}] of ${path} in`, obj);
        break;
      }
    }
  }

  let [ target, index ] = parse(targetPath);

  let selected = last && target ? last[target] : null;

  return [ last, selected, target, index];
}

function parse(str = '') {
  let pattern = /([a-z0-9]*)(?:\[([0-9]*)\])?/i;
  let m = pattern.exec(str) || [];
  m.shift();
  if (!isNone(m[1])){
    m[1] = parseInt(m[1], 10);
  }
  return m;
}

function isArray(obj) {
  return typeOf(obj) === 'array';
}

function isObject(obj) {
  return typeOf(obj) === 'object';
}