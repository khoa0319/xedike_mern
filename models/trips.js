/* 3rd packages */
const mongoose = require('mongoose');
const { UserSchema } = require('../models/users');
const TripSchema = mongoose.Schema({
  // cannot modified: email, id, phone, usertype
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  locationFrom: String, 
  locationTo: String,
  startTime: {type:Date},
  options: [String],
  AvailableSeats: {type: Number, },
  fee: {type: Number, min:1, max: 6},
  passengers: {
    type: [UserSchema],
    required: true
  },
  isFinished: {type: Boolean, default: false}
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = { TripSchema, Trip };