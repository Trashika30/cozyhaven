import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewBookings = () => {
  const { hotelId } = useParams();

  const navigate = useNavigate();

  const storedUser = JSON.parse(
    sessionStorage.getItem("currentUser"),
  );

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    standard: 0,
    deluxe: 0,
    suite: 0,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // FETCH BOOKINGS

      const bookingResponse = await fetch(
        `http://localhost:9090/booking/owner/searchBookingByHotelId/${hotelId}`,
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        },
      );

      const bookingResult =
        await bookingResponse.json();

      console.log(bookingResult);

      const bookingList =
        bookingResult.data || [];

      // FETCH USER DETAILS FOR EACH BOOKING

      const enrichedBookings =
        await Promise.all(
          bookingList.map(async (booking) => {
            try {
              const userResponse =
                await fetch(
                  `http://localhost:9090/user/all/searchCustomer/${booking.userId}`,
                );

              const userResult =
                await userResponse.json();

              return {
                ...booking,
                user:
                  userResult.data || {},
              };
            } catch {
              return {
                ...booking,
                user: {},
              };
            }
          }),
        );

      setBookings(enrichedBookings);

      // COUNT ROOM TYPES

      let standard = 0;
      let deluxe = 0;
      let suite = 0;

      enrichedBookings.forEach((booking) => {
        if (
          booking.roomType === "STANDARD"
        ) {
          standard++;
        }

        if (
          booking.roomType === "DELUXE"
        ) {
          deluxe++;
        }

        if (booking.roomType === "SUITE") {
          suite++;
        }
      });

      setStats({
        total: enrichedBookings.length,
        standard,
        deluxe,
        suite,
      });

      setLoading(false);
    } catch (e) {
      console.log(e);

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f5f2",
        padding: "35px",
      }}
    >
      {/* TOP SECTION */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <button
            onClick={() =>
              navigate("/ownerdash")
            }
            style={{
              border: "none",
              background: "transparent",
              color: "#7e006e",
              cursor: "pointer",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            ← Back
          </button>

          <h1
            style={{
              margin: 0,
              color: "#1f2937",
            }}
          >
            Hotel Bookings
          </h1>
        </div>
      </div>

      {/* STATS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              marginBottom: "10px",
            }}
          >
            Total Bookings
          </p>

          <h2
            style={{
              margin: 0,
              color: "#7e006e",
              fontSize: "32px",
            }}
          >
            {stats.total}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              marginBottom: "10px",
            }}
          >
            Standard Rooms
          </p>

          <h2
            style={{
              margin: 0,
              color: "#7e006e",
              fontSize: "32px",
            }}
          >
            {stats.standard}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              marginBottom: "10px",
            }}
          >
            Deluxe Rooms
          </p>

          <h2
            style={{
              margin: 0,
              color: "#7e006e",
              fontSize: "32px",
            }}
          >
            {stats.deluxe}
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              color: "#6b7280",
              marginBottom: "10px",
            }}
          >
            Suite Rooms
          </p>

          <h2
            style={{
              margin: 0,
              color: "#7e006e",
              fontSize: "32px",
            }}
          >
            {stats.suite}
          </h2>
        </div>
      </div>

      {/* TABLE */}

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#7e006e",
              color: "white",
            }}
          >
            <tr>
              <th style={thStyle}>
                Booking ID
              </th>

              <th style={thStyle}>
                Customer
              </th>

              <th style={thStyle}>
                Email
              </th>

              <th style={thStyle}>
                Contact
              </th>

              <th style={thStyle}>
                Room Type
              </th>

              <th style={thStyle}>
                Check In
              </th>

              <th style={thStyle}>
                Check Out
              </th>

              <th style={thStyle}>
                Guests
              </th>

              <th style={thStyle}>
                Amount
              </th>

              <th style={thStyle}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.bookingId}
                style={{
                  borderBottom:
                    "1px solid #e5e7eb",
                }}
              >
                <td style={tdStyle}>
                  #{booking.bookingId}
                </td>

                <td style={tdStyle}>
                  {
                    booking.user
                      ?.firstName
                  }{" "}
                  {
                    booking.user
                      ?.lastName
                  }
                </td>

                <td style={tdStyle}>
                  {booking.user?.email}
                </td>

                <td style={tdStyle}>
                  {
                    booking.user
                      ?.contact
                  }
                </td>

                <td style={tdStyle}>
                  {booking.roomType}
                </td>

                <td style={tdStyle}>
                  {
                    booking.checkInDate
                  }
                </td>

                <td style={tdStyle}>
                  {
                    booking.checkOutDate
                  }
                </td>

                <td style={tdStyle}>
                  Adults:
                  {
                    booking.adultCount
                  }
                  <br />
                  Children:
                  {
                    booking.childCount
                  }
                </td>

                <td style={tdStyle}>
                  ₹{" "}
                  {
                    booking.totalAmount
                  }
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      padding:
                        "6px 12px",
                      borderRadius:
                        "20px",

                      background:
                        booking.status ===
                        "CONFIRMED"
                          ? "#dcfce7"
                          : booking.status ===
                            "PENDING"
                          ? "#fef3c7"
                          : "#fee2e2",

                      color:
                        booking.status ===
                        "CONFIRMED"
                          ? "#166534"
                          : booking.status ===
                            "PENDING"
                          ? "#92400e"
                          : "#991b1b",

                      fontSize:
                        "13px",

                      fontWeight:
                        "600",
                    }}
                  >
                    {
                      booking.status
                    }
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div
            style={{
              padding: "60px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: "#374151",
              }}
            >
              No Bookings Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  padding: "16px",
  textAlign: "left",
  fontSize: "14px",
};

const tdStyle = {
  padding: "16px",
  fontSize: "14px",
  color: "#374151",
};

export default ViewBookings;