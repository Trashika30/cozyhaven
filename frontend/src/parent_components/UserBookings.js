import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingDetail from "../child_components/BookingDetail"

const UserBookings = () => {

    const { userId } = useParams()

    const [bookings, setBookings] = useState([])

    useEffect(() => {

        fetch(`http://localhost:9090/booking/customer/searchUserBookings/${userId}`)

            .then((res) => res.json())

            .then((data) => {

                setBookings(data)

            })

            .catch((e) => {

                console.log(e)

            })

    }, [userId])

    return (

        <div
            style={{
                padding: "30px",
                backgroundColor: "#f5f3ef",
                minHeight: "100vh"
            }}
        >

            <h1
                style={{
                    marginBottom: "25px"
                }}
            >
                My Bookings
            </h1>

            {
                bookings.length > 0 ?

                    bookings.map((booking) => (

                        <BookingDetail
                            key={booking.bookingId}
                            booking={booking}
                        />

                    ))

                    :

                    <h2>No Bookings Found</h2>
            }

        </div>

    )

}

export default UserBookings