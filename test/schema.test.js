const { test } = require('node:test');
const assert = require('node:assert/strict');
const Person = require('../models/Person');

test('name is required and foods default to an array', () => {
  assert.ok(new Person({ age: 20 }).validateSync().errors.name);
  const person = new Person({ name: 'Alex', age: 25 });
  assert.equal(person.validateSync(), undefined);
  assert.deepEqual(Array.from(person.favoriteFoods), []);
});

test('invalid age is rejected and string foods can be appended', () => {
  assert.ok(new Person({ name: 'Ben', age: 'not a number' }).validateSync().errors.age);
  const person = new Person({ name: 'Mary', age: 30, favoriteFoods: ['burritos'] });
  person.favoriteFoods.push('hamburger');
  assert.equal(person.validateSync(), undefined);
  assert.deepEqual(Array.from(person.favoriteFoods), ['burritos', 'hamburger']);
});
