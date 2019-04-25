/* 3rd packages */
const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  manufactoringYear: { type: Number, required: true, min:2000 },
  licensePlate: { type: String, required: true },
  numberOfSeats: { type: Number, required: true, min:2, max: 10 },
  carImage: { type: String }
})

const DriverSchema = mongoose.Schema({
  // cannot modified: email, id, phone, usertype
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  address: { type: String, required: true },
  passportId: { type: String, required: true },
  mainJob: { type: String, required: true },
  carInfo: {
    type: CarSchema,
    required: true
  },
  passengerRate: {type: Number}
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = { DriverSchema, Driver };