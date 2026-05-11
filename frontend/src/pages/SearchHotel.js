
import Hotel from '../components/Hotel'
import "../css/Hotel.module.css"
import {useState,useEffect} from "react"


const SearchHotel=()=>{
   
    let[hotels,setHotels]=useState([])

    useEffect(()=>{
        fetch("http:/localhost:9090/hotel/all/showAll")
        .then((res)=>res.json())
        .then((response)=>setHotels(response.data))
        .catch((e)=>{
            let hotel=
                [{
                    "hotelId": 1,
                    "hotelName": "Cozy Haven Resort",
                    "description": "A peaceful stay with modern amenities and scenic views.",
                    "location": "Ooty, Tamil Nadu",
                    "contact": "+91-9876543210",
                    "imageUrl": null,
                    "amenities": 
                    [
                      "Free WiFi",
                      "Swimming Pool",
                      "Parking",
                      "Restaurant",
                      "Gym"
                    ],
                    "ownerId": 2
                  }]
            
            setHotels(hotel);
        })
    },[])

    return(<>
   <div className="hotels-container">
    {
    hotels.map((hotel)=>(<Hotel hotel={hotel}/>))
   }

</div>
    </>)

}

export default SearchHotel;