/* 3rd packages */
const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  brand: String,
  model: String,
  manufactoringYear: Number,
  licensePlate: String,
  numberOfSeats: Number,
  carImage: String
})

const DriverSchema = mongoose.Schema({
  // cannot modified: email, id, phone, usertype
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  address: String,
  passportId: String,
  mainJob: String,
  carInfo: {
    type: CarSchema,
    required: true
  },
  passengerRate: Number
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = { DriverSchema, Driver };