import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"
import { Booking } from "./Booking"
import { DropSort } from "./DropDown"
import "./Bookings.css"

export const BookingList = () => {
    const [bookings, setBookings] = useState([])
    const [filteredBookings, setFilteredBookings] = useState([])
    const [pendingBookings, setPendingBookings] = useState(false)
    const [approvedBookings, setApprovedBooking] = useState(false)
    const [deniedBookings, setDeniedBookings] = useState(false)
    const [canceledBookings, setCanceledBookings] = useState(false)
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

    useEffect(
        () => {
            if (pendingBookings) {
                const pendingBooking = bookings.filter(booking => booking.status === "Pending")
                setFilteredBookings(pendingBooking)
            } else {
                setFilteredBookings(bookings)
            }
        },
        [pendingBookings]
    )

    useEffect(
        () => {
            if (approvedBookings) {
                const approvedBooking = bookings.filter(booking => booking.status === "Approved")
                setFilteredBookings(approvedBooking)
            } else {
                setFilteredBookings(bookings)
            }
        },
        [approvedBookings]
    )

    useEffect(
        () => {
            if (deniedBookings) {
                const deniedBooking = bookings.filter(booking => booking.status === "Denied")
                setFilteredBookings(deniedBooking)
            } else {
                setFilteredBookings(bookings)
            }
        },
        [deniedBookings]
    )

    useEffect(
        () => {
            if (canceledBookings) {
                const canceledBooking = bookings.filter(booking => booking.status === "Canceled")
                setFilteredBookings(canceledBooking)
            } else {
                setFilteredBookings(bookings)
            }
        },
        [canceledBookings]
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
        <h2>
            {
                massageUserObject.staff
                    ? `List of All Bookings`
                    : `Welcome ${massageUserObject.name}. Here are all your events`
            }
        </h2>
        {
            massageUserObject.staff
                ? <DropSort bookingObject={filteredBookings}
                    setPendingBookings={setPendingBookings}
                    setApprovedBooking={setApprovedBooking}
                    setDeniedBookings={setDeniedBookings}
                    setCanceledBookings={setCanceledBookings} />
                : <Button color="primary" onClick={() => navigate("/bookings/create")}>Create New Event</Button>
        }
        <article className="bookings">
            {
                filteredBookings.length === 0
                    ? <h2 className="empty__bookings">It looks as though you have no events currently planned.
                        If you would like to book a new one, please click the "Create New Event" button above.</h2>
                    : filteredBookings.map(
                        (filteredBooking) => <Booking key={`filteredBookings--${filteredBooking.id}`}
                            getAllBookings={getAllBookings}
                            currentUser={massageUserObject}
                            bookingObject={filteredBooking} />
                    )
            }
        </article>
    </>
}
