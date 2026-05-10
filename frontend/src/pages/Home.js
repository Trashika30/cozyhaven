import { useState } from "react";
import "../css/Home.css";

const Home = () => {

    const [guestOpen, setGuestOpen] = useState(false);

    const offers = [
        {
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            title: "25% OFF",
            subtitle: "Early Bird Special"
        },
        {
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
            title: "15% OFF",
            subtitle: "Weekend Getaway"
        },
        {
            image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
            title: "FREE",
            subtitle: "Breakfast Included"
        },
        {
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            title: "30% OFF",
            subtitle: "Luxury Room Deal"
        },
        {
            image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
            title: "20% OFF",
            subtitle: "Family Package"
        }
    ];

    const destinations = [
        {
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            name: "Chennai"
        },
        {
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
            name: "Delhi"
        },
        {
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            name: "Kolkata"
        },
        {
            image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
            name: "Goa"
        },
        {
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
            name: "Mumbai"
        }
    ];

    return (

        <div>

            {/* NAVBAR */}

            <div className="navbar">

                <div className="logo">
                    CozyHaven
                </div>

                <div className="nav-links">

                    <a href="/">Home</a>

                    <a href="/">Hotels</a>

                    <a href="/" className="signin">
                        Sign In
                    </a>

                </div>

            </div>

            {/* HERO */}

            <div className="hero">

                <h1>Find your perfect stay anywhere</h1>

                <p>Discover amazing hotels at the best prices</p>

                <div className="search-box">

                    <div className="search-field">

                        <label>Location</label>

                        <input
                            type="text"
                            placeholder="Where are you going?"
                            list="cities"
                            className="city-input"
                        />

                        <datalist id="cities">
                            <option value="Chennai" />
                            <option value="Delhi" />
                            <option value="Kolkata" />
                            <option value="Mumbai" />
                        </datalist>

                    </div>

                    <div className="date-group">

                        <div className="search-field">

                            <label>Check-In</label>

                            <input type="date" />

                        </div>

                        <div className="search-field">

                            <label>Check-Out</label>

                            <input type="date" />

                        </div>

                    </div>

                    {/* GUEST */}

                    <div className="guest-container">

                        <button
                            className="guest-btn"
                            onClick={() => setGuestOpen(!guestOpen)}
                        >
                            Guests & Rooms
                        </button>

                        {
                            guestOpen &&

                            <div className="guest-dropdown">

                                <div className="row">

                                    <label>Adults</label>

                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>

                                </div>

                                <div className="row">

                                    <label>Children</label>

                                    <select>
                                        <option>0</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>

                                </div>

                                <div className="row">

                                    <label>Rooms</label>

                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>

                                </div>

                            </div>

                        }

                    </div>

                    <button className="search-btn">
                        Search
                    </button>

                </div>

            </div>

            {/* SPECIAL OFFERS */}

            <div className="section">

                <h2>Special Offers</h2>

                <div className="cards">

                    {

                        offers.map((offer, index) => (

                            <div className="card" key={index}>

                                <img
                                    src={`${offer.image}?auto=format&fit=crop&w=800&q=80`}
                                    alt=""
                                />

                                <div className="card-text">

                                    {offer.title}

                                    <br />

                                    {offer.subtitle}

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

            {/* DESTINATIONS */}

            <div className="section">

                <h2>Popular Destinations</h2>

                <div className="cards">

                    {

                        destinations.map((place, index) => (

                            <div className="card" key={index}>

                                <img
                                    src={`${place.image}?auto=format&fit=crop&w=800&q=80`}
                                    alt=""
                                />

                                <div className="card-text">
                                    {place.name}
                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );
};

export default Home;