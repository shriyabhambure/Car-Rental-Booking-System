import React from "react";
import "./styles.css";

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="#home">Home</a>
        <a href="#bookCar">Book a Car</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav-right">
        {!props.isLoggedIn && (
          <>
            <button className="nav-btn" onClick={props.onLoginClick}>
              Login
            </button>
            <button className="nav-btn" onClick={props.onRegisterClick}>
              Register
            </button>
          </>
        )}
        {props.isLoggedIn && (
          <button className="nav-btn" onClick={props.onLogoutClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
