import { useState } from "react";
import AddRoom from "../child_components/AddRoom";
import EditRoom from "../child_components/EditRoom";

const OwnerDash = () => {
//dummy data for now
  const [roomlist, setRoomlist] = useState([
    {
      roomId: 101,
      roomType: "Double Deluxe Room",
      maxOccupy: 3,
      baseFare: 3000,
      ac: true,
      available: true,
      hotelId: 1,
      location: "Goa",
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },

    {
      roomId: 102,
      roomType: "Single Standard Room",
      maxOccupy: 2,
      baseFare: 2000,
      ac: false,
      available: true,
      hotelId: 2,
      location: "Chennai",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    },
  ]);

  const updateRoom = (updatedRoom) => {

    const updatedList = roomlist.map((room) =>
      room.roomId === updatedRoom.roomId
        ? updatedRoom
        : room
    );

    setRoomlist(updatedList);
  };

  const deleteRoom = (id) => {

    const filteredRooms = roomlist.filter(
      (room) => room.roomId !== id
    );

    setRoomlist(filteredRooms);
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f7f4f9",
        minHeight: "100vh",
      }}
    >

     

      <div
        style={{
          marginBottom: "40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AddRoom />
      </div>


      <h1
        style={{
          marginBottom: "30px",
          color: "#8e24aa",
          fontSize: "32px",
          fontWeight: "700",
        }}
      >
        Room List
      </h1>


      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "30px",
        }}
      >
        {
          roomlist.map((room) => (
            <EditRoom
              key={room.roomId}
              room={room}
              updateRoom={updateRoom}
              deleteRoom={deleteRoom}
            />
          ))
        }
      </div>

    </div>
  );
};

export default OwnerDash;