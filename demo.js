const { promisify } = require('util');
const { mongoose, connectDatabase } = require('./db');
const exercises = require('./exercises');

async function main() {
  // Explicit opt-in: the exercise deletes ALL people named Mary.
  // Use a separate practice database, never a database holding real contacts.
  if (!process.argv.includes('--run-exercises')) {
    console.log('Use a disposable practice database, then run: npm start -- --run-exercises');
    console.log('The demo inserts sample people and deletes all records named Mary.');
    return;
  }
  try {
    await connectDatabase();
    const run = (name, ...args) => promisify(exercises[name])(...args);
    const person = await run('createAndSavePerson');
    console.log('Saved person:', person);
    console.log('Created people:', await run('createManyPeople', [
      { name: 'Mary', age: 30, favoriteFoods: ['burritos'] },
      { name: 'Mary', age: 22, favoriteFoods: ['pasta'] },
      { name: 'Alex', age: 24, favoriteFoods: ['burritos'] },
      { name: 'Ben', age: 28, favoriteFoods: ['burritos'] }
    ]));
    console.log('By name:', await run('findPeopleByName', 'Mary'));
    console.log('By food:', await run('findOneByFood', 'burritos'));
    console.log('By ID:', await run('findPersonById', person._id));
    console.log('Added hamburger:', await run('findEditThenSave', person._id));
    console.log('Age changed:', await run('findAndUpdate', 'Marvin'));
    console.log('Burrito fans:', await run('queryChain'));
    console.log('Removed person:', await run('removeById', person._id));
    console.log('Removed Mary records:', await run('removeManyPeople'));
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(err => {
  console.error('Demo failed:', err.message);
  process.exitCode = 1;
});
