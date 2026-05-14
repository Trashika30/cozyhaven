import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, DatePicker, Tabs, Tooltip } from "antd";
import { useState } from "react";
import styles from "../css/ViewHotel.module.css";
import { useNavigate } from "react-router-dom";

const onOk = value => {
    console.log('onOk: ', value);
};

const ViewHotel = () => {

    const [roomTypes, setRoomTypes] = useState([]);

    const addRoomType = () => {
        setRoomTypes([
            ...roomTypes,
            {
                type: "",
                rooms: ""
            }
        ]);
    };

    const nav = useNavigate();

    const updateRoomType = (index, field, value) => {
        const updatedRooms = [...roomTypes];
        updatedRooms[index][field] = value;
        setRoomTypes(updatedRooms);
    };

    let [checkIn, setCheckIn] = useState("");
    let [checkOut, setCheckOut] = useState("");
    let [adults, setAdults] = useState(0);
    let [children, setChildren] = useState(0);

    const removeRoomType = (index) => {
        setRoomTypes(roomTypes.filter((_, i) => i !== index));
    };

    const printdata = () => {
        console.log(checkIn, checkOut, adults, children, roomTypes);
    }

    const calculateBaseAmount = () => {
        let total = 0;
        roomTypes.forEach((room) => {
            let roomPrice = 0;
            if (room.type.includes("Standard"))
                roomPrice = 6000;
            else if (room.type.includes("Deluxe"))
                roomPrice = 8500;
            else if (room.type.includes("Suite"))
                roomPrice = 11500;
            let roomCount = parseInt(room.rooms);

            if (!isNaN(roomCount)) {
                total += roomPrice * roomCount;
            }
        });

        return total;
    };

    return (
        <div className={styles["hotel-page"]}>

            <div className={styles["navbar"]}>

                <h2 className={styles["logo"]}>
                    CozyHaven
                </h2>

                <div className={styles["nav-links"]}>

                    <a href="/">
                        Home
                    </a>

                    <a href="/">
                        Hotels
                    </a>

                    <button className={styles["signin-btn"]}>
                        Sign In
                    </button>

                </div>

            </div>

            <div className={styles["container"]}>

                <div className={styles["hotel-header"]}>

                    <div>

                        <h1>
                            Grand Seaside Resort
                        </h1>

                        <p>
                            📍 Calangute Beach, North Goa
                        </p>

                        <p>
                            1247 reviews
                        </p>

                    </div>

                    <div className={styles["rating"]}>
                        ⭐ 4.8
                    </div>

                </div>

                <div className={styles["gallery-section"]}>

                    <div className={styles["main-image"]}>

                        <img
                            src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                            alt="hotel"
                        />
                        {
                            calculateBaseAmount() > 0 &&
                            <div className={styles["amount-card"]}>
                                <p>
                                    Base Amount
                                </p>
                                <h2>
                                    ₹ {calculateBaseAmount()}
                                </h2>
                                <span>
                                    Excluding taxes & additional charges
                                </span>
                            </div>
                        }

                    </div>

                    

                    <Card className={styles["booking-card"]}>

                        <h2>
                            Starting at ₹6000 / night
                        </h2>

                        <p>
                            Excludes taxes and fees
                        </p><br />

                        <p>
                            Check-in
                        </p>

                        <DatePicker className={styles["date-picker"]} onChange={(date, dateString) => setCheckIn(dateString)} />

                        <p>
                            Check-out
                        </p>
                        <DatePicker className={styles["date-picker"]} onChange={(date, dateString) => setCheckOut(dateString)} />

                        <div className={styles["date-picker"]}>

                            <div className={styles["label-row"]}>

                                <p>Adults</p>

                                <Tooltip title="Adult age should be above 14">
                                    <InfoCircleOutlined className={styles["info-icon"]} />
                                </Tooltip>

                            </div>

                            <input type="number" placeholder="Enter number of Adults" onChange={e => setAdults(parseInt(e.target.value))} />

                        </div>

                        <div className={styles["date-picker"]}>

                            <div className={styles["label-row"]}>

                                <p className={styles["label-text"]}>
                                    Children
                                </p>

                                <Tooltip title="Children age should be less than 14">
                                    <InfoCircleOutlined className={styles["info-icon"]} />
                                </Tooltip>

                            </div>

                            <input type="number" placeholder="Enter number of Children" onChange={e => setChildren(parseInt(e.target.value))} />

                        </div>

                        {
                            roomTypes.map((room, index) => (
                                <div className={styles["room-type-card"]} key={index}>

                                    <select onChange={(e) =>
                                        updateRoomType(index, "type", e.target.value)
                                    }>
                                        <option>Select</option>
                                        <option>Standard ₹6000/N</option>
                                        <option>Deluxe ₹8500/N</option>
                                        <option>Suite ₹11500/N</option>
                                    </select>

                                    <select onChange={(e) =>
                                        updateRoomType(index, "rooms", e.target.value)
                                    }>
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
                            ))
                        }

                        <button
                            className={styles["add-room-btn"]}
                            onClick={addRoomType}
                        >
                            + Add Room Type
                        </button>

                        
                        <button className={styles["book-btn"]} onClick={printdata}>
                            Book Now
                        </button>

                    </Card>

                </div>

                <div className={styles["about-section"]}>

                    <h2>
                        About this property
                    </h2>

                    <p>
                        Experience luxury by the beach at Grand Seaside Resort.
                        Our premium rooms offer stunning ocean views, modern amenities,
                        and exceptional service.
                    </p>

                </div>

                <Tabs
                    defaultActiveKey="1"
                    className={styles["hotel-tabs"]}
                    items={[
                        {
                            key: "1",
                            label: "Amenities",
                            children: (
                                <ul>
                                    <li>Free WiFi</li>
                                    <li>Swimming Pool</li>
                                    <li>Parking</li>
                                    <li>Air Conditioning</li>
                                    <li>Gym</li>
                                    <li>Spa</li>
                                </ul>
                            )
                        },
                        {
                            key: "2",
                            label: "Food & Dining",
                            children: (
                                <ul>
                                    <li>Seafood Restaurant</li>
                                    <li>Buffet Breakfast</li>
                                    <li>Beachside Café</li>
                                    <li>24/7 Room Service</li>
                                </ul>
                            )
                        },
                        {
                            key: "3",
                            label: "Guest Reviews",
                            children: (
                                <div>

                                    <h3>
                                        ⭐ 4.8 rating from 1247 reviews
                                    </h3>

                                    <div className={styles["review-card"]}>
                                        <h4>⭐ 5.0 – Priya Sharma</h4>

                                        <p>
                                            Amazing stay! The beach view from the room was stunning.
                                        </p>
                                    </div>

                                    <div className={styles["review-card"]}>
                                        <h4>⭐ 4.7 – Rahul Mehta</h4>

                                        <p>
                                            Rooms were very clean and spacious.
                                        </p>
                                    </div>

                                </div>
                            )
                        },
                        {
                            key: "4",
                            label: "Location",
                            children: (
                                <p>
                                    Calangute Beach Road, Goa
                                </p>
                            )
                        },
                        {
                            key: "5",
                            label: "Contact Details",
                            children: (
                                <div>
                                    <p>📞 +91 9876543210</p>
                                    <p>📧 reservations@grandseaside.com</p>
                                </div>
                            )
                        }
                    ]}
                />

            </div>

        </div>
    );
}
export default ViewHotel;