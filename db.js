require('dotenv').config();
const mongoose = require('mongoose');

function connectDatabase() {
  // Keep the real Atlas URI in .env, never in source control.
  if (!process.env.MONGO_URI) {
    throw new Error('Set MONGO_URI in your private .env file before connecting.');
  }
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = { mongoose, connectDatabase };
