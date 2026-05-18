// ViewBookings.js

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../css/ViewBookings.module.css";

const ViewBookings = () => {
  const { hotelId } = useParams();

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser"),
  );

  const [bookings, setBookings] = useState([]);

  const [filteredBookings, setFilteredBookings] =
    useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  });

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    const filtered = bookings.filter(
      (booking) => {
        const fullName = `${booking.customer?.firstName || ""} ${booking.customer?.lastName || ""}`
          .toLowerCase();

        return fullName.includes(
          search.toLowerCase(),
        );
      },
    );

    setFilteredBookings(filtered);
  }, [search, bookings]);

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:9090/booking/owner/searchBookingByHotelId/${hotelId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      const bookingData = Array.isArray(result)
        ? result
        : result.data || [];

      const updatedBookings = await Promise.all(
        bookingData.map(async (booking) => {
          try {
            const userRes = await fetch(
              `http://localhost:9090/user/all/searchCustomer/${booking.userId}`,
              {
                headers: {
                  Authorization: `Bearer ${currentUser?.token}`,
                },
              },
            );

            const userData =
              await userRes.json();

            return {
              ...booking,
              customer:
                userData.data || {},
            };
          } catch (error) {
            console.log(error);

            return {
              ...booking,
              customer: {},
            };
          }
        }),
      );

      setBookings(updatedBookings);

      let confirmed = 0;
      let pending = 0;
      let cancelled = 0;

      updatedBookings.forEach((booking) => {
        if (booking.status === "CONFIRMED") {
          confirmed++;
        }

        if (booking.status === "PENDING") {
          pending++;
        }

        if (booking.status === "CANCELLED") {
          cancelled++;
        }
      });

      setStats({
        total: updatedBookings.length,
        confirmed,
        pending,
        cancelled,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "CONFIRMED") {
      return styles.confirmed;
    }

    if (status === "PENDING") {
      return styles.pending;
    }

    return styles.cancelled;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h1>Loading Bookings...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <button
          className={styles.backBtn}
          onClick={() =>
            navigate("/ownerdash")
          }
        >
          ← Back
        </button>

        <h1>Hotel Bookings</h1>

        <p>
          Manage and monitor all hotel
          reservations
        </p>
      </div>

      {/* STATS */}

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p>Total Bookings</p>
          <h2>{stats.total}</h2>
        </div>

        <div className={styles.statCard}>
          <p>Confirmed</p>
          <h2>{stats.confirmed}</h2>
        </div>

        <div className={styles.statCard}>
          <p>Pending</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className={styles.statCard}>
          <p>Cancelled</p>
          <h2>{stats.cancelled}</h2>
        </div>
      </div>

      {/* SEARCH */}

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {/* TABLE */}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking</th>
              <th>Customer</th>
              <th>Room Details</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Guests</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(
                (booking) => (
                  <tr
                    key={
                      booking.bookingId
                    }
                  >
                    <td>
                      <div
                        className={
                          styles.bookingId
                        }
                      >
                        #
                        {
                          booking.bookingId
                        }
                      </div>

                      <div
                        className={
                          styles.hotelName
                        }
                      >
                        {
                          booking.hotelName
                        }
                      </div>
                    </td>

                    <td>
                      <div
                        className={
                          styles.customerName
                        }
                      >
                        {booking.customer
                          ?.firstName ||
                          "Guest"}{" "}
                        {booking.customer
                          ?.lastName ||
                          ""}
                      </div>

                      <div
                        className={
                          styles.customerEmail
                        }
                      >
                        {booking.customer
                          ?.email ||
                          "No Email"}
                      </div>
                    </td>

                    <td>
                      {
                        booking.roomType
                      }
                    </td>

                    <td>
                      {
                        booking.checkInDate
                      }
                    </td>

                    <td>
                      {
                        booking.checkOutDate
                      }
                    </td>

                    <td>
                      Adults:{" "}
                      {
                        booking.adultCount
                      }
                      <br />

                      Children:{" "}
                      {
                        booking.childCount
                      }
                    </td>

                    <td
                      className={
                        styles.amount
                      }
                    >
                      ₹
                      {
                        booking.totalAmount
                      }
                    </td>

                    <td>
                      <span
                        className={`${styles.status} ${getStatusClass(
                          booking.status,
                        )}`}
                      >
                        {
                          booking.status
                        }
                      </span>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className={
                    styles.noBookings
                  }
                >
                  No Bookings Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBookings;