import { useEffect, useState } from "react";
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
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.token}`,
          },
        },
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
        Authorization: `Bearer ${storedUser.token}`,
      },

      body: JSON.stringify(user),
    })
      .then((res) => res.json())

      .then((data) => {
        alert("Profile Updated Successfully");

        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...storedUser,
            user: data.data,
          }),
        );

        setUser(data.data);
      })

      .catch((e) => {
        console.log(e);

        alert("Update Failed");
      });
  };

  const cancelBooking = (bookingId) => {
    const reason = prompt("Enter cancellation reason:");

    if (!reason || reason.trim() === "") {
      alert("Cancellation reason is required");
      return;
    }

    fetch(
      `http://localhost:9090/booking/customer/cancelBooking/${bookingId}/${encodeURIComponent(reason)}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedUser.token}`,
        },
      },
    )
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        alert("Booking Cancelled Successfully");

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.bookingId === bookingId
              ? { ...booking, status: "CANCELLED" }
              : booking,
          ),
        );
      })

      .catch((e) => {
        console.log(e);

        alert("Cancellation Failed");
      });
  };

  return (
    <div className={styles["hotel-page"]}>
      {/* NAVBAR */}

      <div className={styles["navbar"]}>
        <h2 className={styles["logo"]}>CozyHaven</h2>

        <div className={styles["nav-links"]}>
          <Link to="/">Home</Link>

          <Link to="/search">Hotels</Link>
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
            background: "rgba(255,255,255,0.95)",
            padding: "30px",
            borderRadius: "22px",
            marginBottom: "35px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
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
         <h1 style={{
              marginBottom: "18px",
              fontSize: "20px",
              fontWeight: "700",
              color: "#9635a4",
            }}
          >
            My Bookings
          </h1>

          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.bookingId}
                style={{
                  background: "white",
                  padding: "22px",
                  borderRadius: "18px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                  maxWidth: "950px",
                }}
              >
                <h2
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    marginBottom: "20px",
                    color: "#1f2937",
                  }}
                >
                  {booking.hotelName}
                </h2>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <strong>Room Type:</strong> {booking.roomType}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <strong>Adults:</strong> {booking.adultCount}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <strong>Check In:</strong> {booking.checkInDate}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <strong>Children:</strong> {booking.childCount}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        marginBottom: "12px",
                        fontSize: "16px",
                      }}
                    >
                      <strong>Check Out:</strong> {booking.checkOutDate}
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <strong>Total:</strong> ₹ {booking.totalAmount}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          booking.status === "CANCELLED"
                            ? "#dc2626"
                            : booking.status === "PENDING"
                            ? "#f59e0b"
                            : "#16a34a",
                      }}
                    >
                      {booking.status}
                    </span>
                  </p>

                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => cancelBooking(booking.bookingId)}
                      style={{
                        padding: "10px 18px",
                        background:
                          "linear-gradient(135deg, #ef4444, #dc2626)",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "14px",
                        boxShadow: "0 4px 10px rgba(220,38,38,0.3)",
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
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
              <h2>No Bookings Found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;