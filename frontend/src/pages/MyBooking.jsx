// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext.js";
// import { BASE_URL } from "../utils/config.js";
// import "../Styles/mybooking.css";

// const MyBookings = () => {
//   const { user } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);

//   const fetchBookings = async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/booking/user/${user._id}`);
//       const data = await res.json();
//       if (res.ok) {
//         setBookings(data.data);
//       }
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleCancel = async (id) => {
//     const confirm = window.confirm("Are you sure you want to cancel this booking?");
//     if (!confirm) return;

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(`${BASE_URL}/booking/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const result = await res.json();
//       if (res.ok) {
//         alert(result.message);
//         setBookings(bookings.filter((b) => b._id !== id));
//       } else {
//         alert(result.message);
//       }
//     } catch (err) {
//       alert("Error cancelling booking.");
//     }
//   };

//   useEffect(() => {
//     if (user) fetchBookings();
//   }, [user]);

//   return (
//     <div className="my-bookings">
//       <h2>My Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <ul>
//           {bookings.map((b) => (
//             <li key={b._id}>
//               <h4>{b.tourName}</h4>
//               <p>Booked for: {b.bookAt}</p>
//               <p>Guests: {b.guestSize}</p>
//               <button onClick={() => handleCancel(b._id)}>Cancel Booking</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyBookings;

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { BASE_URL } from "../utils/config.js";
import "../Styles/mybooking.css";
import Newsletter from "../shared/Newsletter.jsx";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/booking/user/${user._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setBookings(data.data);
    } else {
      console.error("Error fetching bookings:", data.message);
    }
  } catch (err) {
    console.error(err.message);
  }
};


  const handleCancel = async (id) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/booking/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setBookings(bookings.filter((b) => b._id !== id));
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Error cancelling booking.");
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  return (
    <>
    <div className="my-bookings">
      <h2 className="text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h4>{booking.tourName}</h4>
              <p><strong>Full Name:</strong> {booking.fullName}</p>
              <p><strong>Guests:</strong> {booking.guestSize}</p>
              <p><strong>Phone:</strong> {booking.phone}</p>
              <p><strong>Date:</strong> {new Date(booking.bookAt).toLocaleDateString()}</p>
              <button
                className="btn btn-danger"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
      <Newsletter />
      </>
  );
};

export default MyBookings;

