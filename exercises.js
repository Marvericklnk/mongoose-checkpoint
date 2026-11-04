const Person = require('./models/Person');

// Create one document and save it with an error-first callback.
function createAndSavePerson(done) {
  const person = new Person({
    name: 'Marvin', age: 26, favoriteFoods: ['rice', 'beans']
  });
  person.save(function (err, data) {
    done(err, data);
  });
}

// Model.create accepts an array and saves all the supplied people.
function createManyPeople(arrayOfPeople, done) {
  Person.create(arrayOfPeople, done);
}

// find returns every person whose name matches the argument.
function findPeopleByName(personName, done) {
  Person.find({ name: personName }, done);
}

// An equality query on an array matches an element within that array.
function findOneByFood(food, done) {
  Person.findOne({ favoriteFoods: food }, done);
}

// Search for the single document with this MongoDB ID.
function findPersonById(personId, done) {
  Person.findById(personId, done);
}

// Classic update: first find the document, edit it, then save it.
function findEditThenSave(personId, done) {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    if (!person) return done(null, null);
    person.favoriteFoods.push('hamburger');
    person.save(function (saveError, updatedPerson) {
      done(saveError, updatedPerson);
    });
  });
}

// new:true returns the updated document rather than the old one.
function findAndUpdate(personName, done) {
  Person.findOneAndUpdate(
    { name: personName }, { $set: { age: 20 } }, { new: true }, done
  );
}

// These legacy methods are available in the pinned Mongoose 6 version.
function removeById(personId, done) {
  Person.findByIdAndRemove(personId, done);
}

// Return the deletion result, including deletedCount, to the caller.
function removeManyPeople(done) {
  Person.remove({ name: 'Mary' }, function (err, result) {
    done(err, result);
  });
}

// Sort burrito fans by name, take two, and omit the age field.
function queryChain(done) {
  Person.find({ favoriteFoods: 'burritos' })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec(done);
}

module.exports = {
  Person, createAndSavePerson, createManyPeople, findPeopleByName,
  findOneByFood, findPersonById, findEditThenSave, findAndUpdate,
  removeById, removeManyPeople, queryChain
};
