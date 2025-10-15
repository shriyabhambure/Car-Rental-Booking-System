const express = require('express');
const router = express.Router();
const Booking = require('./Booking'); // Since Booking.js is in the same folder

// Create a new booking
router.post('/api/bookings', async (req, res) => {
  try {
    const { carId, carName, userEmail, userName, phone, startDate, endDate } = req.body;
    await Booking.create({ carId, carName, userEmail, userName, phone, startDate, endDate });
    res.status(201).json({ message: 'Booking successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Get all bookings
router.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
