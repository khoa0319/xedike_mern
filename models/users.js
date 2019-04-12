/* 3rd packages */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: String,
  fullName: String,
  phone: String,
  userType: { type: String, require: true },
  dateOfBirth: Date,
  registerDate: {type: Date, default: new Date()},
  numberOfTrips: Number,
  numberOfKms: Number,
  avatar: String,
  isActive: {type: Boolean, default: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };