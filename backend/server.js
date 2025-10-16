const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

// JWT imports & secret
const jwt = require('jsonwebtoken');
const SECRET = 'your_super_secret_jwt_key';

// Model imports
const User = require('./User');
const Car = require('./Car');

const app = express();
app.use(express.json());
app.use(cors());

// JWT authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Import modular bookings router
const bookingRouter = require('./BookingDetails'); // Name matches your file
app.use(bookingRouter);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/carRentalDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Home route (test)
app.get('/', (req, res) => {
  res.send('Car Rental backend running!');
});

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// JWT Login route 
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found!' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password!' });

    // Create JWT token and send it to frontend
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '2h' });
    res.json({
      message: 'Login successful',
      token,
      user: { name: user.name, isAdmin: user.isAdmin }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a car
app.post('/api/cars', async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ message: 'Car added', car });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
