import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/ViewHotel.module.css";

const UserProfile = () => {

  const storedUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const [user, setUser] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    if (storedUser) {

      setUser(storedUser.user);

      fetch(
        `http://localhost:9090/booking/customer/searchUserBookings/${storedUser.user.userId}`,
      )

        .then((res) => res.json())

        .then((data) => {

          console.log(data);

          setBookings(data.data || []);

        })

        .catch((e) => {

          console.log(e);

        });

    }

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

  };

  const updateProfile = () => {

    fetch(`http://localhost:9090/user/customer/updateCustomer/${user.userId}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),

    })

      .then((res) => res.json())

      .then((data) => {

        console.log(data);

        alert("Profile Updated Successfully");

        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...storedUser,
            user: data.data,
          })
        );
      
        setUser(data.data);

      })

      .catch((e) => {

        console.log(e);

        alert("Update Failed");

      });

  };

  return (

    <div className={styles["hotel-page"]}>

      {/* NAVBAR */}

      <div className={styles["navbar"]}>

        <h2 className={styles["logo"]}>
          CozyHaven
        </h2>

        <div className={styles["nav-links"]}>

          <Link to="/">
            Home
          </Link>

          <Link to="/search">
            Hotels
          </Link>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "40px",
        }}
      >

        {/* PROFILE CARD */}

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "40px",
          }}
        >

          <h1
            style={{
              marginBottom: "25px",
            }}
          >
            User Profile
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact"
              value={user.contact}
              onChange={handleChange}
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleChange}
              style={{
                gridColumn: "1/3",
              }}
            />

          </div>

          <button
            onClick={updateProfile}
            className={styles["book-btn"]}
            style={{
              marginTop: "25px",
              width: "220px",
            }}
          >
            Update Profile
          </button>

        </div>

        {/* BOOKINGS */}

        <div>

          <h1
            style={{
              marginBottom: "25px",
            }}
          >
            My Bookings
          </h1>

          {bookings.length > 0 ? (

            bookings.map((booking) => (

              <div
                key={booking.bookingId}
                style={{
                  backgroundColor: "white",
                  padding: "25px",
                  borderRadius: "15px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >

                <h2>
                  {booking.hotelName}
                </h2>

                <p>
                  <strong>Room Type:</strong> {booking.roomType}
                </p>

                <p>
                  <strong>Check In:</strong> {booking.checkInDate}
                </p>

                <p>
                  <strong>Check Out:</strong> {booking.checkOutDate}
                </p>

                <p>
                  <strong>Adults:</strong> {booking.adultCount}
                </p>

                <p>
                  <strong>Children:</strong> {booking.childCount}
                </p>

                <p>
                  <strong>Total Amount:</strong> ₹ {booking.totalAmount}
                </p>

                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

              </div>

            ))

          ) : (

            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "15px",
              }}
            >

              <h2>
                No Bookings Found
              </h2>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default UserProfile;