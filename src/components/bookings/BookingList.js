import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Booking } from "./Booking"
import "./Bookings.css"

export const BookingList = ({ searchTermState }) => {
    const [bookings, setBookings] = useState([])
    const [filteredBookings, setFilteredBookings] = useState([])
    const navigate = useNavigate()

    //gets local storage user info
    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    //gets all bookings from API
    const getAllBookings = () => {
        fetch(`http://localhost:8088/bookings`)
            .then(response => response.json())
            .then((bookingsArray) => {
                setBookings(bookingsArray)
            })
    }

    //sets all bookings
    useEffect(
        () => { getAllBookings() },
        []
    )

    //filters the list for either staff or customers
    useEffect(
        () => {
            if (massageUserObject.staff) {
                //employees can see all bookings
                setFilteredBookings(bookings)
            } else {
                //customers can only see their own bookings
                const myBookings = bookings.filter(booking => booking.userId === massageUserObject.id)
                setFilteredBookings(myBookings)
            }
        },
        [bookings]
    )

    //staff sees list of all booking from API
    //customers see button to create new booking, and any bookings they already have
    return <>
        {
            massageUserObject.staff
                ? ""
                : <button onClick={() => navigate("/bookings/create")}>Create New Event</button>
        }

        <h2>List of Bookings</h2>

        <article className="bookings">
            {
                filteredBookings.map(
                    (filteredBooking) => <Booking key={`filteredBookings--${filteredBooking.id}`}
                    getAllBookings={getAllBookings}
                    currentUser={massageUserObject}
                    bookingObject={filteredBooking} />
                )
            }
        </article>
    </>
}
