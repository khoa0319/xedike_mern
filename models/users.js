/* 3rd packages */
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  // cannot modified: email, id, phone, usertype
  email: { type: String, required: true },
  password: {type: String, required: true }, 
  fullName: {type: String, required: true },
  phone: String,
  userType: { type: String, required: true },
  dateOfBirth: { type: Date },
  registerDate: { type: Date, default: new Date() },
  numberOfTrips: { type: Number, default: 0 },
  numberOfKms: Number,
  avatar: String,
  isActive: {type: Boolean, default: true }
});

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };