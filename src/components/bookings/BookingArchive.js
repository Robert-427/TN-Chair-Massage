import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { Booking } from "./Booking"

export const ArchiveList = () => {
    const [bookings, setBookings] = useState([])
    const [filteredBookings, setFilteredBookings] = useState([])
    const navigate = useNavigate()

    //gets local storage user info
    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

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

    //sorts all archived books in inverse date order
    const sortByDate = (arr) => {
        const sorter = (a, b) => {
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        }
        arr.sort(sorter)
    }
    sortByDate(bookings)

    //filters list to only show archived events
    useEffect(
        () => {
            if (massageUserObject.staff) {
                //employees can see all bookings
                const activeBookings = bookings.filter(booking => booking.status === "Archived")
                setFilteredBookings(activeBookings)
            }
        },
        [bookings]
    )

    //generates each booking event
    const listing = () => {
        return filteredBookings.map(
            (filteredBooking) => <Booking key={`filteredBookings--${filteredBooking.id}`}
                getAllBookings={getAllBookings}
                currentUser={massageUserObject}
                bookingObject={filteredBooking} />
        )
    }

    //staff sees list of all booking from API
    //customers see button to create new booking, and any bookings they already have
    return <>
        <h2>List of All Bookings</h2>
        <Button color="primary" onClick={() => navigate("/bookings")}>Go Back to Current Bookings</Button>
        <article className="bookings">
            {listing()}
        </article>
    </>
}
