/* 3rd packages */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String, require: true },
  password: String, 
  fullName: String,
  phone: String,
  userType: { type: String, require: true },
  dateOfBirth: {type: Date},
  registerDate: {type: Date, default: new Date().getTime()},
  numberOfTrips: { type: Number, default: 0 },
  numberOfKms: Number,
  avatar: String,
  isActive: {type: Boolean, default: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };