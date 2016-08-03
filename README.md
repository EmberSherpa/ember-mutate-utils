# ember-mutate-utils

WARNING: this addon enables mutating objects complex nested objects.
This is generally an antipattern and should be avoided. Unfortunately,
there are some who can not avoid this. This is created for them.

WARNING: currently, this library only supports simple hashes and arrays,
it does not support Ember.Object instances. This is yet another antipattern.

## API

### `mutate(obj, path, value)`

This function will mutate a property at given path with specified value with `Ember.get`
to ensure that bound observers fire.

You can mutate properties on objects with `.` notation.

```js
let a = {
  b: {
    b1: 'xyz'
  }
}

mutate(a, 'b.b1', 'abc');

/**
 console.log(a); //=> a: { b: { b1: 'abc' } } 
 **/
```

You can also mutate arrays. When you mutate the array, 
a new array will be created with new in place of old value.

```js
let a = {
  b: {
    c: [ 'red', 'blue', 'yellow' ],
  }
}

mutate(a, 'b.c[1]', 'green');

/**
 console.log(a); //=> { b: { c: [ 'red', 'green', 'yellow' ] } }
 **/
```

You can combine these as well.

```js
let a = {
  b: {
    c: [ 
      { d1: 'hello' }
      { d1: 'world' },
      { d1: '!' }
  }
}

mutate(a, 'b.c[2].d2', '?');

/**
 console.log(a); //=> { b: { c: [ { d1: 'hello' }, { d1: 'world' }, { d1: '?' } ] } }
 **/
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
