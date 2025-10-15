// backend/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  type: String,
  seats: Number,
  pricePerDay: Number,
  fuel: String,
  mileage: String,
  transmission: String,
  year: Number,
  ac: String,
  bootSpace: String,
  special: String
});

module.exports = mongoose.model('Car', carSchema);
