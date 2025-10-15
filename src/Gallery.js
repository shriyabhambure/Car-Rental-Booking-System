import React, { useEffect, useState } from "react";
import axios from "axios";

function Gallery({ onCarClick, isLoggedIn }) {
  const [cars, setCars] = useState([]);
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    phone: "",
    startDate: "",
    endDate: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/cars")
      .then(res => setCars(res.data))
      .catch(err => console.error("Error fetching cars:", err));
  }, []);

  const toggleDetails = (id) => {
    setExpandedCarId(prevId => (prevId === id ? null : id));
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookCar = (car) => {
    if (!isLoggedIn) {
      setMessage("Please log in to book a car.");
      return;
    }
    setSelectedCar(car);
    setMessage("");
    setFormData({ userName: "", userEmail: "", phone: "", startDate: "", endDate: "" });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bookings", {
        carId: selectedCar._id,
        carName: selectedCar.name,
        userName: formData.userName,
        userEmail: formData.userEmail,
        phone: formData.phone,
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      setMessage("Booking successful!");
      setSelectedCar(null);
    } catch (err) {
      setMessage("Booking failed. Please try again.");
    }
  };

  const closeForm = () => {
    setSelectedCar(null);
    setMessage("");
  };

  return (
    <div className="gallery">
      {message && <div className="message">{message}</div>}

      {/* Modal Booking Form */}
      {selectedCar && (
        <div className="modal-overlay">
          <div className="modal-form">
            <button className="close-modal" onClick={closeForm}>
              ×
            </button>
            <h2>Book {selectedCar.name}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <input name="userName" placeholder="Your Name" value={formData.userName} onChange={handleInputChange} required className="auth-input"/>
              <input name="userEmail" type="email" placeholder="Your Email" value={formData.userEmail} onChange={handleInputChange} required className="auth-input"/>
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required className="auth-input"/>
              <input name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} required className="auth-input"/>
              <input name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} required className="auth-input"/>
              <button type="submit" className="auth-btn">Book</button>
            </form>
          </div>
        </div>
      )}

      <div className="gallery-container">
        <h2 className="gallery-heading">Available Cars</h2>
        <div className="car-grid">
          {cars.map(car => (
            <div key={car._id} className="car-card">
              <div className="car-card">
                <img src={car.image} alt={car.name} className="car-image"/>
                <h3 className="car-name">{car.name}</h3>
                <p style={{fontSize:"14px", color:"#555"}}>₹{car.pricePerDay} per day</p>
                <button onClick={() => toggleDetails(car._id)}>
                  {expandedCarId === car._id ? "Hide Details" : "More Details"}
                </button>
                {expandedCarId === car._id && (
                  <div className="inline-car-details">
                    <p>Type: {car.type}</p>
                    <p>Seats: {car.seats}</p>
                    <p>Fuel: {car.fuel}</p>
                    <p>Mileage: {car.mileage}</p>
                    <p>Year: {car.year}</p>
                    <p>AC: {car.ac ? "Yes" : "No"}</p>
                    <p>Boot Space: {car.bootSpace}</p>
                    <p>Special: {car.special}</p>
                  </div>
                )}
                <button
                  onClick={() => handleBookCar(car)}
                  disabled={!isLoggedIn}
                  style={isLoggedIn ? {} : { opacity: 0.56, cursor: "not-allowed" }}
                >
                  Book Now
                </button>
                {!isLoggedIn && <div style={{fontSize:"12px", color:"#b03a24"}}>Log in to book</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
