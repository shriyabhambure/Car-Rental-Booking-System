import React, { useState } from 'react';
import axios from 'axios';

function BookingForm({ car, user, onBooked, onClose }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        carId: car._id,
        carName: car.name,
        userEmail: user.email,
        userName: user.name,
        phone,
        startDate,
        endDate
      });
      setMsg('Booking successful!');
      if (onBooked) onBooked();
    } catch (err) {
      setMsg('Booking failed!');
    }
  };

  return (
    <div className="login-section" style={{maxWidth:'340px'}}>
      <h3>Book {car.name}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone Number</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="Enter Phone Number" />
        </div>
        <div>
          <label>Start Date</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        </div>
        <button type="submit">Confirm Booking</button>
        {msg && <div style={{color: msg.includes('success') ? 'green' : 'red'}}>{msg}</div>}
      </form>
      <button style={{marginTop:10}} onClick={onClose}>Cancel</button>
    </div>
  );
}

export default BookingForm;
