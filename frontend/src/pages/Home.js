import "../css/Home.css";

const Home = () => {

    const offers = [
        {
            image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
            title: "25% OFF",
            subtitle: "Early Bird Special"
        },
        {
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            title: "15% OFF",
            subtitle: "Weekend Getaway"
        },
        {
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
            title: "FREE",
            subtitle: "Breakfast Included"
        },
        {
            image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
            title: "30% OFF",
            subtitle: "Luxury Room Deal"
        },
        {
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            title: "20% OFF",
            subtitle: "Family Package"
        }
    ];

    const destinations = [
        {
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
            name: "Chennai"
        },
        {
            image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            name: "Delhi"
        },
        {
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
            name: "Kolkata"
        },
        {
            image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
            name: "Goa"
        },
        {
            image: "https://images.unsplash.com/photo-1519046904884-53103b34b206",
            name: "Mumbai"
        }
    ];

    return (

        <div className="home">

            <nav className="navbar">

                <h1 className="logo">
                    CozyHaven
                </h1>

                <div className="nav-links">

                    <a href="/">Home</a>
                    <a href="/">Hotels</a>

                    <button className="signin-btn">
                        Sign In
                    </button>

                </div>

            </nav>

            <section className="hero-section">

                <div className="overlay">

                    <h1>
                        Find your perfect stay anywhere
                    </h1>

                    <p>
                        Discover amazing hotels at the best prices
                    </p>

                    <div className="search-box">

                        <div className="input-group">
                            <label>Location</label>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                            />
                        </div>

                        <div className="input-group">
                            <label>Check-In</label>
                            <input type="date" />
                        </div>

                        <div className="input-group">
                            <label>Check-Out</label>
                            <input type="date" />
                        </div>

                        <div className="input-group">
                            <label>Guests</label>
                            <input
                                type="text"
                                placeholder="Guests & Rooms"
                            />
                        </div>

                        <button className="search-btn">
                            Search
                        </button>

                    </div>

                </div>

            </section>

            <section className="offers-section">

                <h1>
                    Special Offers
                </h1>

                <div className="offers-container">

                    {
                        offers.map((offer, index) => (

                            <div
                                className="offer-card"
                                key={index}
                            >

                                <img
                                    src={offer.image}
                                    alt=""
                                />

                                <div className="offer-overlay">

                                    <h2>{offer.title}</h2>

                                    <p>{offer.subtitle}</p>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </section>

            <section className="destination-section">

                <h1>
                    Popular Destinations
                </h1>

                <div className="destination-container">

                    {
                        destinations.map((place, index) => (

                            <div
                                className="destination-card"
                                key={index}
                            >

                                <img
                                    src={place.image}
                                    alt=""
                                />

                                <div className="destination-overlay">

                                    <h2>{place.name}</h2>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </section>

        </div>

    );
};

export default Home;