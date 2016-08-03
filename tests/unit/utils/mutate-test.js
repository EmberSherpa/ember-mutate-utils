import mutate from 'dummy/utils/mutate';
import { module, test } from 'qunit';

module('Unit | Utility | mutate');

// Replace this with your real tests.
test('it works', function(assert) {

  let obj = fixture();
  
  mutate(obj, 'a.b.c.c1', 10);
  assert.deepEqual(obj, {
    a: {
      b: {
        c: {
          c1: 10,
          c2: [ 
            { d1: 0, d2: 'hij' }, 
            { e1: 123, e2: 'klm' }, 
            { f1: 'nop' } 
          ]
        },
        b1: 'abc'
      },
      a1: 'xyz'
    }
  });

  obj = fixture();
  mutate(obj, 'a.b.c.c2[0].d1', 20);
  assert.deepEqual(obj, {
    a: {
      b: {
        c: {
          c1: null,
          c2: [ 
            { d1: 20, d2: 'hij' }, 
            { e1: 123, e2: 'klm' }, 
            { f1: 'nop' } 
          ]
        },
        b1: 'abc'
      },
      a1: 'xyz'
    }
  });

  obj = fixture();
  mutate(obj, 'a.b.c.c2[0].d1', 20);
  assert.deepEqual(obj, {
    a: {
      b: {
        c: {
          c1: null,
          c2: [ 
            { d1: 20, d2: 'hij' }, 
            { e1: 123, e2: 'klm' }, 
            { f1: 'nop' } 
          ]
        },
        b1: 'abc'
      },
      a1: 'xyz'
    }
  });

  function fixture() {
    return {
      a: {
        b: {
          c: {
            c1: null,
            c2: [ 
              { d1: 0, d2: 'hij' }, 
              { e1: 123, e2: 'klm' }, 
              { f1: 'nop' } 
            ]
          },
          b1: 'abc'
        },
        a1: 'xyz'
      }
    };
  }
});

test('it works with simple paths', function(assert){

  let a = {
    b: [ 'c', 'd', 'e' ]
  };

  mutate(a, 'b[1]', 'F');
  assert.deepEqual(a, {
    b: [ 'c', 'F', 'e']
  });

});

test('it works with nested arrays', function(assert){

  let a = {
    b: [
      {
        c: [
          { d: 'xyz' },
          { d: 'zyx' }
        ]
      },
      {
        c: [
          { d: 'klm' },
          { d: 'hjk' }
        ]
      }
    ],
    a1: 'abc'
  };

  mutate(a, 'b[1].c[1].d', 'zoo');
  assert.deepEqual(a, {
    b: [
      {
        c: [
          { d: 'xyz' },
          { d: 'zyx' }
        ]
      },
      {
        c: [
          { d: 'klm' },
          { d: 'zoo' }
        ]
      }
    ],
    a1: 'abc'
  });

});