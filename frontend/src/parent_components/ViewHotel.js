import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, DatePicker, Tabs, Tooltip } from "antd";
import { useState, useEffect } from "react";
import styles from "../css/ViewHotel.module.css";
import { useNavigate, useParams } from "react-router-dom";

const ViewHotel = () => {
  const { hotelId } = useParams();

  const nav = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const [hotel, setHotel] = useState(null);

  const [roomTypes, setRoomTypes] = useState([]);

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [adults, setAdults] = useState(0);

  const [children, setChildren] = useState(0);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9090/hotel/all/searchById/${hotelId}`)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);

        setHotel(response.data);
      })

      .catch((e) => {
        console.log(e);
      });

    fetch(`http://localhost:9090/review/all/searchByHotelId/${hotelId}`)
      .then((res) => res.json())

      .then((response) => {
        console.log(response);

        setReviews(response.data);
      })

      .catch((e) => {
        console.log(e);

        setReviews([]);
      });
  }, [hotelId]);

  const addRoomType = () => {
    setRoomTypes([
      ...roomTypes,
      {
        type: "",
        rooms: "",
      },
    ]);
  };

  const updateRoomType = (index, field, value) => {
    const updatedRooms = [...roomTypes];

    updatedRooms[index][field] = value;

    setRoomTypes(updatedRooms);
  };

  const removeRoomType = (index) => {
    setRoomTypes(roomTypes.filter((_, i) => i !== index));
  };

  const calculateBaseAmount = () => {
    let total = 0;

    roomTypes.forEach((room) => {
      let roomPrice = 0;

      if (room.type.includes("Standard")) roomPrice = hotel.standard;
      else if (room.type.includes("Deluxe")) roomPrice = hotel.deluxe;
      else if (room.type.includes("Suite")) roomPrice = hotel.suite;

      let roomCount = parseInt(room.rooms);

      if (!isNaN(roomCount)) {
        total += roomPrice * roomCount;
      }
    });

    return total;
  };

  const createBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates");

      return;
    }

    if (roomTypes.length === 0) {
      alert("Please add room type");

      return;
    }

    const bookingData = {
      hotelName: hotel.hotelName,

      roomType: roomTypes.map((r) => r.type).join(", "),

      checkInDate: checkIn,

      checkOutDate: checkOut,

      childCount: children,

      adultCount: adults,

      totalAmount: calculateBaseAmount(),

      status: "BOOKED",

      roomId: hotel.hotelId,

      userId: user.userId,

      cancellationReason: "",
    };

    fetch("http://localhost:9090/booking/customer/addBooking", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())

      .then((response) => {
        console.log(response);

        alert("Booking Successful");

        nav(`/booking/${user.userId}`);
      })

      .catch((e) => {
        console.log(e);

        alert("Booking Failed");
      });
  };

  // IMPORTANT FIX

  if (!hotel) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles["hotel-page"]}>
      {/* NAVBAR */}

      <div className={styles["navbar"]}>
        <h2 className={styles["logo"]}>CozyHaven</h2>

        <div className={styles["nav-links"]}>
          <a href="/">Home</a>

          <a href="/search">Hotels</a>

          <button
            className={styles["signin-btn"]}
            onClick={() => nav("/userProfile")}
          >
            Profile
          </button>
        </div>
      </div>

      {/* MAIN */}

      <div className={styles["container"]}>
        {/* HEADER */}

        <div className={styles["hotel-header"]}>
          <div>
            <h1>{hotel.hotelName}</h1>

            <p>📍 {hotel.location}</p>

            <p>Luxury Stay Experience</p>
          </div>

          <div className={styles["rating"]}>{hotel.ratings}</div>
        </div>

        {/* IMAGE + BOOKING */}

        <div className={styles["gallery-section"]}>
          <div className={styles["main-image"]}>
            <img src={hotel.imageUrl} alt={hotel.hotelName} />

            {calculateBaseAmount() > 0 && (
              <div className={styles["amount-card"]}>
                <p>Base Amount</p>

                <h2>₹ {calculateBaseAmount()}</h2>

                <span>Excluding taxes & additional charges</span>
              </div>
            )}
          </div>

          {/* BOOKING CARD */}

          <Card className={styles["booking-card"]}>
            <h2>Starting at ₹ {hotel.standard} / night</h2>

            <p>Excludes taxes and fees</p>

            <br />

            <p>Check-in</p>

            <DatePicker
              className={styles["date-picker"]}
              onChange={(date, dateString) => setCheckIn(dateString)}
            />

            <p>Check-out</p>

            <DatePicker
              className={styles["date-picker"]}
              onChange={(date, dateString) => setCheckOut(dateString)}
            />

            {/* ADULTS */}

            <div className={styles["date-picker"]}>
              <div className={styles["label-row"]}>
                <p>Adults</p>

                <Tooltip title="Adult age above 14">
                  <InfoCircleOutlined className={styles["info-icon"]} />
                </Tooltip>
              </div>

              <input
                type="number"
                placeholder="Enter Adults"
                onChange={(e) => setAdults(parseInt(e.target.value))}
              />
            </div>

            {/* CHILDREN */}

            <div className={styles["date-picker"]}>
              <div className={styles["label-row"]}>
                <p>Children</p>

                <Tooltip title="Children age below 14">
                  <InfoCircleOutlined className={styles["info-icon"]} />
                </Tooltip>
              </div>

              <input
                type="number"
                placeholder="Enter Children"
                onChange={(e) => setChildren(parseInt(e.target.value))}
              />
            </div>

            {/* ROOM TYPES */}

            {roomTypes.map((room, index) => (
              <div className={styles["room-type-card"]} key={index}>
                <select
                  onChange={(e) =>
                    updateRoomType(index, "type", e.target.value)
                  }
                >
                  <option>Select</option>

                  <option>Standard {`₹${hotel.standard}/N`}</option>

                  <option>Deluxe {`₹${hotel.deluxe}/N`}</option>

                  <option>Suite {`₹${hotel.suite}/N`}</option>
                </select>

                <select
                  onChange={(e) =>
                    updateRoomType(index, "rooms", e.target.value)
                  }
                >
                  <option>Select</option>

                  <option>1 Room</option>

                  <option>2 Rooms</option>

                  <option>3 Rooms</option>

                  <option>4 Rooms</option>
                </select>

                <button
                  className={styles["remove-room-btn"]}
                  onClick={() => removeRoomType(index)}
                >
                  <CloseOutlined />
                </button>
              </div>
            ))}

            <button className={styles["add-room-btn"]} onClick={addRoomType}>
              + Add Room Type
            </button>

            <button className={styles["book-btn"]} onClick={createBooking}>
              Book Now
            </button>
          </Card>
        </div>

        {/* ABOUT */}

        <div className={styles["about-section"]}>
          <h2>About this property</h2>

          <p>{hotel.description}</p>
        </div>

        {/* TABS */}

        <Tabs
          defaultActiveKey="1"
          className={styles["hotel-tabs"]}
          items={[
            {
              key: "1",

              label: "Amenities",

              children: (
                <ul>
                  {hotel.amenities?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ),
            },

            {
              key: "2",

              label: "Location",

              children: <p>{hotel.location}</p>,
            },

            {
              key: "3",

              label: "Contact",

              children: <p>📞 {hotel.contact}</p>,
            },

            {
              key: "4",

              label: "Reviews",

              children: (
                <>
                  {reviews?.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className={styles["review-card"]}>
                        <h4>Customer {review.customerId}</h4>

                        <p>{review.comment}</p>

                        <span>⭐ {review.rating}</span>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ViewHotel;
