import React, { useState } from 'react';
import './styles.css';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Gallery from './Gallery';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  function handleLogin(username, password) {
    setLoginMessage(`Welcome to RentCar`);
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowRegister(false);
  }

  function handleLogout() {
    setShowLogin(false);
    setIsLoggedIn(false);
    setLoginMessage("");
  }

  function handleCarClick(car) {
    if (!isLoggedIn) setShowLogin(true);
    else alert("Proceed to Book Car (Backend integration coming next!)");
  }

  function handleRegisterSuccess() {
    setShowRegister(false);
    setShowLogin(true);
    setLoginMessage("Registration successful! Please log in.");
  }

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLoginClick={() => {
          setShowLogin(true);
          setShowRegister(false);
        }}
        onRegisterClick={() => {
          setShowRegister(true);
          setShowLogin(false);
        }}
        onLogoutClick={handleLogout}
      />

      {/* Modals */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-modal" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <Login onLogin={handleLogin} loginMessage={loginMessage} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-modal" onClick={() => setShowRegister(false)}>
              ×
            </button>
            <Register onRegister={handleRegisterSuccess} />
          </div>
        </div>
      )}

      {/* Header + Hero */}
      <div className="header">
        <div className="logo-title">
          <img id="img" src="https://img.freepik.com/premium-vector/free-vector-black-red-car-rental-service-logo_883906-3535.jpg?sem=tais.hybrid=w740" alt="Car Rental Logo" />
          <h1>DriveEasy Rentals</h1>
        </div>
      </div>
      <section id="home" className="hero section-gap">
        <h2>Welcome to Your Ultimate Car Rental Experience</h2>
        <p>Fast, easy and affordable car rentals at your fingertips.</p>
      </section>

      {/* Book a Car Section */}
      <section id="bookCar" className="section-gap">
        <Gallery onCarClick={handleCarClick} isLoggedIn={isLoggedIn} />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-gap">
        <h2>Pricing & Offers</h2>
        <div className="pricing-table">
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Type</th>
                <th>Price / Day</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Honda City</td><td>Sedan</td><td>₹2500</td></tr>
              <tr><td>Hyundai Creta</td><td>SUV</td><td>₹3200</td></tr>
              <tr><td>Maruti Swift</td><td>Hatchback</td><td>₹1800</td></tr>
              <tr><td>Toyota Innova Crysta</td><td>MUV</td><td>₹4000</td></tr>
              <tr><td>Tata Nexon EV</td><td>SUV</td><td>₹3500</td></tr>
              <tr><td>Mahindra Thar</td><td>SUV</td><td>₹4500</td></tr>
              <tr><td>Skoda Kushaq</td><td>SUV</td><td>₹3300</td></tr>
              <tr><td>Kia Seltos</td><td>SUV</td><td>₹3400</td></tr>
              <tr><td>Maruti Alto</td><td>Hatchback</td><td>₹1500</td></tr>
            </tbody>
          </table>
          <ul className="offers-list">
            <li><b>Long-term Savings:</b> 10% off for bookings 7+ days</li>
            <li><b>Student Special:</b> 5% off with college ID</li>
            <li><b>All Charges Included:</b> Basic insurance & taxes, no hidden fees</li>
            <li><b>Late Return:</b> Extra ₹100/hour after due time</li>
            <li><b>Payment:</b> Cash, UPI & Credit and Debit cards accepted</li>
          </ul>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <h2>About Us</h2>
        <p>
          <span className="about-highlight">DriveEasy Rentals</span> offers a reliable fleet of cars for every need.<br />
          We’re dedicated to providing stress-free rides, smart prices, and the fastest bookings for students and professionals across the city.<br /><br />
          <b>Why choose us?</b>
        </p>
        <ul className="about-list">
          <li>10+ years in car rental business</li>
          <li>24x7 Customer Support & road assistance</li>
          <li>All cars regularly serviced, sanitized, and GPS-enabled</li>
          <li><span className="about-highlight">Flexible pickup & drop locations</span> anywhere in the city</li>
          <li>Zero hidden charges: what you see is what you pay</li>
          <li>Exclusive student plans and weekend deals</li>
          <li>Wide choice: Hatchbacks, Sedans, SUVs, MUVs, and Electric Vehicles</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2>Contact</h2>
        <div className="contact-details">
          <i>Email:</i> support@driveeasy.com<br />
          <i>Phone:</i> +91 8877665544<br />
          <i>Address:</i> Near Engineering College, Main Road, Mumbai<br />
          <i>Instagram:</i> @driveeasy_official &nbsp; | &nbsp; <i>WhatsApp</i>: 8877665544<br />
          <br />
          <b>We're always happy to help you ride easy!</b>
        </div>
      </section>
    </div>
  );
}
