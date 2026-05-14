import { Link } from "react-router-dom";
import styles from "../css/Hotel.module.css";

const Hotel = ({ hotel }) => {

  return (

    <div className={styles["hotel-card"]}>

      <img
        src={hotel.imageUrl}
        alt={hotel.hotelName}
        className={styles["hotel-image"]}
      />

      <div className={styles["hotel-content"]}>

        <div className={styles["hotel-top"]}>

          <div>
            <h1>{hotel.hotelName}</h1>
            <p>{hotel.location}</p>
          </div>

          <h3 className={styles.rating}>5.0</h3>

        </div>

        <div className={styles.amenities}>

          {
            hotel.amenities?.map((item, index) => (

              <span key={index}>
                {item}
              </span>

            ))
          }

        </div>

        <div className={styles["hotel-bottom"]}>

          <h2>₹6000/night</h2>

          <Link to={`/hotel/${hotel.hotelId}`}>
            <button>View Details</button>
          </Link>

        </div>

      </div>

    </div>

  );
};

export default Hotel;