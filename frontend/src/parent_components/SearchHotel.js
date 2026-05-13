import Hotel from '../child_components/Hotel'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import styles from "../css/SearchNav.module.css";

const SearchHotel = () => {

    let [hotels, setHotels] = useState([])
    let [filteredHotels, setFilteredHotels] = useState([])

    // profile popup
    let [showProfile, setShowProfile] = useState(false)

    // range filter
    let [priceRange, setPriceRange] = useState(10000)

    // amenities filter
    let [selectedAmenities, setSelectedAmenities] = useState([])

    // dummy user data
    const user = {
        userName: "Trashika",
        email: "trashika@gmail.com",
        phone: "+91 9876543210",
        bookings: [
            {
                bookingId: 101,
                hotel: "Ocean Breeze Hotel",
                location: "Goa",
                date: "12 May 2026"
            },
            {
                bookingId: 102,
                hotel: "Royal Palace Inn",
                location: "Jaipur",
                date: "28 April 2026"
            }
        ]
    }

    useEffect(() => {

        fetch("http://localhost:9090/hotel/all/showAll")

            .then((res) => res.json())

            .then((response) => {

                setHotels(response.data)
                setFilteredHotels(response.data)

            })

            .catch((e) => {

                let hotel = [

                    {
                        "hotelId": 1,
                        "hotelName": "Cozy Haven Resort",
                        "description": "A peaceful stay with modern amenities and scenic views.",
                        "location": "Ooty, Tamil Nadu",
                        "contact": "+91-9876543210",
                        "imageUrl": "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                        "amenities": [
                            "Free WiFi",
                            "Swimming Pool",
                            "Parking",
                            "Restaurant",
                            "Gym"
                        ],
                        "price": 6000,
                        "rating": 5.0,
                        "ownerId": 2
                    },

                    {
                        "hotelId": 2,
                        "hotelName": "Ocean Breeze Hotel",
                        "description": "Luxury beachfront hotel with stunning ocean views.",
                        "location": "Goa, India",
                        "contact": "+91-9123456780",
                        "imageUrl": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
                        "amenities": [
                            "Spa",
                            "Restaurant",
                            "Free WiFi"
                        ],
                        "price": 4000,
                        "rating": 4.3,
                        "ownerId": 3
                    },

                    {
                        "hotelId": 3,
                        "hotelName": "Mountain Peak Retreat",
                        "description": "Experience nature and comfort in the heart of the hills.",
                        "location": "Manali, Himachal Pradesh",
                        "contact": "+91-9988776655",
                        "imageUrl": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                        "amenities": [
                            "Bonfire",
                            "Room Service",
                            "Parking",
                            "Mountain View",
                            "Free WiFi"
                        ],
                        "price": 5500,
                        "rating": 5.0,
                        "ownerId": 4
                    },

                    {
                        "hotelId": 4,
                        "hotelName": "Royal Palace Inn",
                        "description": "Elegant rooms with royal interiors and premium facilities.",
                        "location": "Jaipur, Rajasthan",
                        "contact": "+91-9090909090",
                        "imageUrl": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
                        "amenities": [
                            "Swimming Pool",
                            "Restaurant",
                            "Gym",
                            "Parking"
                        ],
                        "price": 8000,
                        "rating": 4.5,
                        "ownerId": 5
                    },

                    {
                        "hotelId": 5,
                        "hotelName": "Green Valley Stay",
                        "description": "Relax in eco-friendly cottages surrounded by greenery.",
                        "location": "Munnar, Kerala",
                        "contact": "+91-9345678901",
                        "imageUrl": "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
                        "amenities": [
                            "Nature Walk",
                            "Campfire",
                            "Free WiFi",
                            "Restaurant",
                            "Parking"
                        ],
                        "price": 3000,
                        "rating": 4.0,
                        "ownerId": 6
                    }

                ];

                setHotels(hotel);
                setFilteredHotels(hotel);

            })

    }, [])

    // amenity checkbox
    const handleAmenityChange = (amenity) => {

        if (selectedAmenities.includes(amenity)) {

            setSelectedAmenities(
                selectedAmenities.filter((a) => a !== amenity)
            )

        } else {

            setSelectedAmenities([
                ...selectedAmenities,
                amenity
            ])

        }

    }

    // filters
    useEffect(() => {

        let updatedHotels = hotels.filter((hotel) => {

            let matchesPrice = hotel.price <= priceRange

            let matchesAmenities =
                selectedAmenities.length === 0 ||
                selectedAmenities.every((amenity) =>
                    hotel.amenities.includes(amenity)
                )

            return matchesPrice && matchesAmenities

        })

        setFilteredHotels(updatedHotels)

    }, [priceRange, selectedAmenities, hotels])

    // clear filters
    const clearFilters = () => {

        setPriceRange(10000)
        setSelectedAmenities([])
        setFilteredHotels(hotels)

    }

    return (
        <>

            {/* NAVBAR */}

            <div>

                <div
                    className={styles.navbar}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "18px 50px",
                        backgroundColor: "white",
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                        position: "sticky",
                        top: "0",
                        zIndex: "1000"
                    }}
                >

                    <div
                        className={styles.logo}
                        style={{
                            fontSize: "26px",
                            fontWeight: "bold",
                            color: "#a000a0"
                        }}
                    >
                        CozyHaven
                    </div>

                    <div
                        className={styles["nav-links"]}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "18px"
                        }}
                    >

                        <a
                            href="/"
                            style={{
                                textDecoration: "none",
                                color: "black",
                                fontWeight: "500",
                                fontSize: "15px"
                            }}
                        >
                            Home
                        </a>

                        <a
                            href="/"
                            style={{
                                textDecoration: "none",
                                color: "black",
                                fontWeight: "500",
                                fontSize: "15px"
                            }}
                        >
                            Hotels
                        </a>

                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            style={{
                                border: "none",
                                backgroundColor: "#a000a0",
                                color: "white",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "14px",
                                height: "48px"
                            }}
                        >
                            Profile
                        </button>

                        <Link
                            to="/login"
                            className={styles.signin}
                            style={{
                                textDecoration: "none",
                                color: "white",
                                backgroundColor: "#a000a0",
                                padding: "10px 18px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                fontWeight: "600",
                                height: "48px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            SignIn
                        </Link>

                    </div>

                </div>

            </div>

            {/* PROFILE POPUP */}

            {
                showProfile && (

                    <div
                        style={{
                            position: "fixed",
                            top: "90px",
                            right: "40px",
                            width: "320px",
                            backgroundColor: "white",
                            borderRadius: "15px",
                            padding: "18px",
                            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                            zIndex: "2000",
                            fontSize: "14px"
                        }}
                    >

                        <h2
                            style={{
                                marginBottom: "15px",
                                fontSize: "22px"
                            }}
                        >
                            User Profile
                        </h2>

                        <p>
                            <strong>Name :</strong> {user.userName}
                        </p>

                        <p>
                            <strong>Email :</strong> {user.email}
                        </p>

                        <p>
                            <strong>Phone :</strong> {user.phone}
                        </p>

                        <hr style={{ margin: "15px 0px" }} />

                        <h3
                            style={{
                                fontSize: "18px"
                            }}
                        >
                            Booking History
                        </h3>

                        {
                            user.bookings.map((booking) => (

                                <div
                                    key={booking.bookingId}
                                    style={{
                                        marginTop: "12px",
                                        padding: "12px",
                                        borderRadius: "10px",
                                        backgroundColor: "#f5f5f5"
                                    }}
                                >

                                    <p>
                                        <strong>{booking.hotel}</strong>
                                    </p>

                                    <p>{booking.location}</p>

                                    <p>{booking.date}</p>

                                </div>

                            ))
                        }

                    </div>

                )
            }

            {/* MAIN SECTION */}

            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    padding: "30px",
                    backgroundColor: "#f5f3ef",
                    minHeight: "100vh"
                }}
            >

                {/* FILTER SECTION */}

                <div
                    style={{
                        width: "280px",
                        backgroundColor: "white",
                        padding: "25px",
                        borderRadius: "20px",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.08)",
                        height: "fit-content"
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "25px",
                            fontSize: "24px"
                        }}
                    >
                        Filters
                    </h2>

                    {/* PRICE FILTER */}

                    <div>

                        <h3
                            style={{
                                marginBottom: "10px",
                                fontSize: "18px"
                            }}
                        >
                            Price Range
                        </h3>

                        <p
                            style={{
                                fontWeight: "600",
                                marginBottom: "10px",
                                fontSize: "14px"
                            }}
                        >
                            ₹0 - ₹{priceRange}
                        </p>

                        <input
                            type="range"
                            min="1000"
                            max="10000"
                            step="500"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            style={{
                                width: "100%",
                                accentColor: "#a000a0",
                                cursor: "pointer"
                            }}
                        />

                    </div>

                    {/* AMENITIES */}

                    <div style={{ marginTop: "30px" }}>

                        <h3
                            style={{
                                marginBottom: "15px",
                                fontSize: "18px"
                            }}
                        >
                            Amenities
                        </h3>

                        {
                            [
                                "Free WiFi",
                                "Swimming Pool",
                                "Parking",
                                "Restaurant",
                                "Gym",
                                "Spa",
                                "Room Service"
                            ].map((amenity) => (

                                <div
                                    key={amenity}
                                    style={{
                                        marginBottom: "12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                >

                                    <input
                                        type="checkbox"
                                        checked={selectedAmenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                        style={{
                                            width: "16px",
                                            height: "16px",
                                            cursor: "pointer",
                                            accentColor: "#a000a0"
                                        }}
                                    />

                                    <label
                                        style={{
                                            fontSize: "14px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        {amenity}
                                    </label>

                                </div>

                            ))
                        }

                    </div>

                    {/* CLEAR BUTTON */}

                    <button
                        onClick={clearFilters}
                        style={{
                            marginTop: "30px",
                            width: "100%",
                            padding: "12px",
                            border: "none",
                            borderRadius: "10px",
                            backgroundColor: "#a000a0",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "14px"
                        }}
                    >
                        Clear All Filters
                    </button>

                </div>

                {/* HOTELS */}

                <div style={{ flex: 1 }}>

                    <h1
                        style={{
                            marginBottom: "10px",
                            fontSize: "34px"
                        }}
                    >
                        All Hotels
                    </h1>

                    <p
                        style={{
                            marginBottom: "25px",
                            color: "gray",
                            fontSize: "14px"
                        }}
                    >
                        {filteredHotels.length} properties found
                    </p>

                    {
                        filteredHotels.map((hotel) => (

                            <Hotel
                                key={hotel.hotelId}
                                hotel={hotel}
                            />

                        ))
                    }

                </div>

            </div>

        </>
    )

}

export default SearchHotel;