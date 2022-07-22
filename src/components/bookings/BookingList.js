import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const BookingList = ({ searchTermState }) => {
    const [bookings, setBookings] = useState([])
    const [employees, setEmployees] = useState([])
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

    return <>
        <h2>List of Bookings</h2>

        <article className="bookings">
            {
                filteredBookings.map((filteredBooking) =>
                    <section className="booking" key={`booking--${filteredBooking.id}`}>
                        <header className="booking__header">
                            Booking {filteredBooking.id}
                        </header>
                        <section>{filteredBooking.description}</section>
                        <footer></footer>
                    </section>
                )
            }
        </article>
    </>
}

// (booking) => <Ticket key={`filteredBookings--${ticket.id}`} employees={employees}
//                         getAllTickets={getAllTickets}
//                         currentUser={honeyUserObject}
//                         ticketObject={ticket} />