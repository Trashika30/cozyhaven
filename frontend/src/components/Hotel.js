import { Link } from "react-router-dom";
import "../css/Hotel.css";

const Hotel = ({ hotel }) => {

  return (

    <div className="hotel-card">
      <img src={hotel.image} className="hotel-image"/>
    
     <div className="hotel-content">
        <div className="hotel-top">
          <div>
            <h1>{hotel.hotelName}</h1>
            <p>{hotel.location}</p>
          </div>
          <h3 className="rating">5.0</h3>
        </div>

        <div className="amenities">
          {
            hotel.amenities?.map((item, index) => (

              <span key={index}>
                {item}
              </span>
            ))
          }
        </div>

        <div className="hotel-bottom">
          <h2>₹6000/night</h2>
          <Link to={`/hotel/${hotel.hotelId}`}> <button>  View Details </button> </Link>
        </div>
      </div>
    </div>

  );
};

export default Hotel;