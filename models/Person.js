const mongoose = require('mongoose');

// [String] tells Mongoose to track changes to the foods array automatically.
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

module.exports = mongoose.model('Person', personSchema);
