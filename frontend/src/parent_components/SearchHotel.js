import Hotel from "../child_components/Hotel";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../css/SearchHotel.module.css";

const SearchHotel = () => {

    const [hotels, setHotels] = useState([]);

    const [showProfile, setShowProfile] = useState(false);

    const [priceRange, setPriceRange] = useState(10000);

    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {

        fetch("http://localhost:9090/hotel/all/showAll")

            .then((res) => res.json())

            .then((response) => {

                setHotels(response.data);

            })

            .catch((e) => {

                console.log("Error fetching hotels : ", e);

            });

    }, []);

    const handleAmenityChange = (amenity) => {

        if (selectedAmenities.includes(amenity)) {

            setSelectedAmenities(
                selectedAmenities.filter((a) => a !== amenity)
            );

        }

        else {

            setSelectedAmenities([
                ...selectedAmenities,
                amenity
            ]);

        }

    };

    const clearFilters = () => {

        setPriceRange(10000);

        setSelectedAmenities([]);

    };

    const filteredHotels = hotels.filter((hotel) => {

        let matchesPrice =
            hotel.baseFare
                ? hotel.baseFare <= priceRange
                : true;

        let matchesAmenities =
            selectedAmenities.length === 0 ||

            selectedAmenities.every((amenity) =>
                hotel.amenities?.includes(amenity)
            );

        return matchesPrice && matchesAmenities;

    });

    return (

        <>

            {/* NAVBAR */}

            <div className={styles.navbar}>

                <div className={styles.logo}>
                    CozyHaven
                </div>

                <div className={styles.navLinks}>

                    <Link to="/" className={styles.navItem}>
                        Home
                    </Link>

                    <Link to="/" className={styles.navItem}>
                        Hotels
                    </Link>

                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className={styles.profileBtn}
                    >
                        Profile
                    </button>

                </div>

            </div>

            {/* PROFILE */}

            {
                showProfile && (

                    <div className={styles.profilePopup}>

                        <h2 className={styles.profileTitle}>
                            User Profile
                        </h2>

                        <p>
                            <strong>Name :</strong> {user?.userName}
                        </p>

                        <p>
                            <strong>Email :</strong> {user?.email}
                        </p>

                        <p>
                            <strong>Phone :</strong> {user?.phone}
                        </p>

                        <Link
                            to={`/booking/${user?.userId}`}
                            className={styles.bookingLink}
                        >
                            View Bookings
                        </Link>

                    </div>

                )
            }

            {/* MAIN */}

            <div className={styles.mainContainer}>

                {/* FILTER */}

                <div className={styles.filterBox}>

                    <h2 className={styles.filterTitle}>
                        Filters
                    </h2>

                    {/* PRICE */}

                    <div>

                        <h3 className={styles.sectionTitle}>
                            Price Range
                        </h3>

                        <p className={styles.priceText}>
                            ₹1000 - ₹{priceRange}
                        </p>

                        <input
                            type="range"
                            min="1000"
                            max="10000"
                            step="500"
                            value={priceRange}
                            onChange={(e) =>
                                setPriceRange(Number(e.target.value))
                            }
                            className={styles.rangeInput}
                        />

                    </div>

                    {/* AMENITIES */}

                    <div className={styles.amenitiesSection}>

                        <h3 className={styles.sectionTitle}>
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
                                    className={styles.checkboxRow}
                                >

                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedAmenities.includes(amenity)
                                        }
                                        onChange={() =>
                                            handleAmenityChange(amenity)
                                        }
                                        className={styles.checkbox}
                                    />

                                    <label className={styles.checkboxLabel}>
                                        {amenity}
                                    </label>

                                </div>

                            ))
                        }

                    </div>

                    <button
                        onClick={clearFilters}
                        className={styles.clearBtn}
                    >
                        Clear Filters
                    </button>

                </div>

                {/* HOTELS */}

                <div className={styles.hotelsSection}>

                    <h1 className={styles.hotelHeading}>
                        All Hotels
                    </h1>

                    <p className={styles.hotelCount}>
                        {filteredHotels.length} properties found
                    </p>

                    {
                        filteredHotels.length > 0 ?

                            filteredHotels.map((hotel) => (

                                <Hotel
                                    key={hotel.hotelId}
                                    hotel={hotel}
                                />

                            ))

                            :

                            <div className={styles.noHotelsBox}>

                                <h2 className={styles.noHotelsText}>
                                    No Hotels Found
                                </h2>

                            </div>
                    }

                </div>

            </div>

        </>

    );

};

export default SearchHotel;