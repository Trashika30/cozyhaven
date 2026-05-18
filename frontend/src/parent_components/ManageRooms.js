import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ManageRooms = () => {
  const { hotelId } = useParams();

  const storedUser = JSON.parse(
    sessionStorage.getItem("currentUser"),
  );

  const [roomList, setRoomList] = useState([]);

  const [roomData, setRoomData] = useState({
    roomType: "",
    totalRooms: "",
    baseFare: "",
    maxOccupy: "",
    ac: false,
    imageUrl: "",
  });

  useEffect(() => {
    fetch(
      `http://localhost:9090/room/owner/getRooms/${hotelId}`,
      {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      },
    )
      .then((res) => res.json())

      .then((data) => {
        setRoomList(data.data || []);
      })

      .catch((e) => console.log(e));
  }, [hotelId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setRoomData({
      ...roomData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addRoom = () => {
    const payload = {
      ...roomData,
      hotelId: parseInt(hotelId),
    };

    fetch("http://localhost:9090/room/owner/addRoom", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedUser.token}`,
      },

      body: JSON.stringify(payload),
    })
      .then((res) => res.json())

      .then((data) => {
        alert("Room Added");

        setRoomList([...roomList, data.data]);

        setRoomData({
          roomType: "",
          totalRooms: "",
          baseFare: "",
          maxOccupy: "",
          ac: false,
          imageUrl: "",
        });
      })

      .catch((e) => {
        console.log(e);

        alert("Failed");
      });
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8f5f2",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
        }}
      >
        Manage Rooms
      </h1>

      {/* ADD ROOM FORM */}

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          marginBottom: "30px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
        }}
      >
        <input
          type="text"
          name="roomType"
          placeholder="Room Type"
          value={roomData.roomType}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalRooms"
          placeholder="Total Rooms"
          value={roomData.totalRooms}
          onChange={handleChange}
        />

        <input
          type="number"
          name="baseFare"
          placeholder="Base Fare"
          value={roomData.baseFare}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxOccupy"
          placeholder="Max Occupancy"
          value={roomData.maxOccupy}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Room Image URL"
          value={roomData.imageUrl}
          onChange={handleChange}
          style={{
            gridColumn: "1/3",
          }}
        />

        <label>
          <input
            type="checkbox"
            name="ac"
            checked={roomData.ac}
            onChange={handleChange}
          />

          AC Available
        </label>

        <button
          onClick={addRoom}
          style={{
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#8e24aa",
            color: "white",
            cursor: "pointer",
          }}
        >
          Add Room
        </button>
      </div>

      {/* ROOM LIST */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {roomList.map((room) => (
          <div
            key={room.roomCategoryId}
            style={{
              background: "white",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={room.imageUrl}
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
              <h2>{room.roomType}</h2>

              <p>Total Rooms: {room.totalRooms}</p>

              <p>Fare: ₹ {room.baseFare}</p>

              <p>Max Occupancy: {room.maxOccupy}</p>

              <p>
                AC: {room.ac ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;