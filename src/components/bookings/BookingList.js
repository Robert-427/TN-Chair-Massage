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
    const [archivedBookings, setArchivedBookings] = useState(false)
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

    //Sorts all booking by date
    const sortByDate = (arr) => {
        const sorter = (a, b) => {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        }
        arr.sort(sorter)
    }
    sortByDate(bookings)

    //Sorts by pending status
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

    //Sorts by approved status
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

    //Sorts by denied status
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

    //Sorts by canceled status
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

    //Sorts by archived status
    useEffect(
        () => {
            if (archivedBookings) {
                const archivedBookings = bookings.filter(booking => booking.status === "Archived")
                setFilteredBookings(archivedBookings)
            } else {
                setFilteredBookings(bookings)
            }
        },
        [archivedBookings]
    )

    //filters the list for either staff or customers
    useEffect(
        () => {
            if (massageUserObject.staff) {
                //employees can see all bookings
                const activeBookings = bookings.filter(booking => booking.status !== "Archived")
                setFilteredBookings(activeBookings)
            } else {
                //customers can only see their own bookings
                const myBookings = bookings.filter(booking => booking.userId === massageUserObject.id && booking.status !== "Archived")
                setFilteredBookings(myBookings)
            }
        },
        [bookings]
    )

    //shows list of bookings based on various factors
    const listing = () => {
        if (filteredBookings.length === 0 && massageUserObject.staff) {
            return <h2 className="empty__search">It looks as there there are no events that match that Status.</h2>
        } else if (filteredBookings.length === 0) {
            return <h2 className="empty__bookings">It looks as though you have no events currently planned.
                If you would like to book a new one, please click the "Create New Event" button above.</h2>
        } else {
            return filteredBookings.map(
                (filteredBooking) => <Booking key={`filteredBookings--${filteredBooking.id}`}
                    getAllBookings={getAllBookings}
                    currentUser={massageUserObject}
                    bookingObject={filteredBooking} />
            )
        }
    }

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
                    setCanceledBookings={setCanceledBookings}
                    setArchivedBookings={setArchivedBookings} 
                    />
                : <Button color="primary" onClick={() => navigate("/bookings/create")}>Create New Event</Button>
        }
        <article className="bookings">
            {listing()}
        </article>
    </>
}
