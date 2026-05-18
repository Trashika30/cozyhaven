import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerDash = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    sessionStorage.getItem("currentUser"),
  );

  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:9090/hotel/owner/searchByOwnerId/${storedUser.user.userId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      },
    )
      .then((res) => res.json())

      .then((data) => {
        console.log(data);

        setHotelList(data.data || []);
      })

      .catch((e) => console.log(e));
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8f5f2",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            color: "#1f2937",
          }}
        >
          My Hotels
        </h1>

        <button
          onClick={() => navigate("/addHotel")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#8e24aa",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Hotel
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {hotelList.map((hotel) => (
          <div
            key={hotel.hotelId}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={hotel.imageUrl}
              alt=""
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div
              style={{
                padding: "18px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                {hotel.hotelName}
              </h2>

              <p>{hotel.location}</p>

              <button
                onClick={() =>
                  navigate(`/manageRooms/${hotel.hotelId}`)
                }
                style={{
                  marginTop: "15px",
                  width: "100%",
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#1f2937",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Manage Rooms
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDash;