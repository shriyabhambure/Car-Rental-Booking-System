const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  phone: { type: String, required: true },
  carId: { type: String, required: true },
  carName: { type: String, required: true },
  startDate: { type: String, required: true }, // Can use Date if desired
  endDate: { type: String, required: true },   // Can use Date if desired
  status: { type: String, default: 'confirmed' } // confirmed/cancelled
});

module.exports = mongoose.model('Booking', bookingSchema);
