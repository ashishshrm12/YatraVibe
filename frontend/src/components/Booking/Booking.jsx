

import React, { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour = {}, avgRating = 0 }) => {
  const { price = 0, reviews = [] , title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);



  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const serviceFee = 599;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setBooking((prev) => ({ ...prev, [id]: value }));
  // };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [id]: value,
      userId: user && user._id, // reassign just in case
      userEmail: user && user.email,
    }));
  };
  

  const handleClick = async(e) => {
    e.preventDefault();
    console.log(booking);
    try {
      if(!user || user===undefined || user===null){
        alert("Please login to book a tour")
      }
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/booking`,{
        method:'post',
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials:'include',
        body:JSON.stringify(booking)
      })
      const result= await res.json()
      if(!res.ok){
       return alert(result.message)
      }
      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
    
    
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹ {price}
          <span>/person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              required
              id="fullName"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone Number"
              required
              id="phone"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3 mb-4">
            <input
              type="date"
              required
              id="bookAt"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              required
              id="guestSize"
              min="1"
              value={booking.guestSize}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit" className="btn booking__btn w-100">
            Book Now
          </Button>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="px-0 border-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> {booking.guestSize}{" "}
              person(s)
            </h5>
            <span>₹{price * booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem className="px-0 border-0">
            <h5>Service Charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="px-0 border-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
};

export default Booking;

