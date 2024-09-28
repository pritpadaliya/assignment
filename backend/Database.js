// Database.js
const mongoose = require('mongoose');

// Define the schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create the model
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
