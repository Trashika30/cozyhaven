import Hotel from '../child_components/Hotel'
import styles from "../css/Hotel.module.css"
import { useState, useEffect } from "react"

const SearchHotel = () => {

    let [hotels, setHotels] = useState([])

    useEffect(() => {

        fetch("http:/localhost:9090/hotel/all/showAll")

            .then((res) => res.json())

            .then((response) => setHotels(response.data))

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
                            "Beach Access",
                            "Free Breakfast",
                            "Spa",
                            "Bar",
                            "Free WiFi"
                        ],
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
                            "Conference Hall",
                            "Gym",
                            "Parking"
                        ],
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
                        "ownerId": 6
                    },
                
                    {
                        "hotelId": 6,
                        "hotelName": "City Lights Residency",
                        "description": "Modern business hotel located in the city center.",
                        "location": "Bangalore, Karnataka",
                        "contact": "+91-9871234567",
                        "imageUrl": "https://images.unsplash.com/photo-1455587734955-081b22074882",
                        "amenities": [
                            "Conference Room",
                            "Free WiFi",
                            "Restaurant",
                            "Airport Shuttle",
                            "Gym"
                        ],
                        "ownerId": 7
                    }
                ];
                

                setHotels(hotel);

            })

    }, [])

    return ( 
        <> 
        
            <div className={styles["hotels-container"]}>
               

                {
                    hotels.map((hotel) => (
                        <Hotel hotel={hotel} />
                    ))
                }

            </div>
        </>
    )

}

export default SearchHotel;