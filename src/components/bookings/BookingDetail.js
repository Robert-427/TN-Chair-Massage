import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const BookingDetails = () => {
    const [customers, updateCustomers] = useState([])
    const [booking, updateBooking] = useState({})
    const { bookingId } = useParams()
    const navigate = useNavigate()

    //gets local storage user info
    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    //gets the booking and user info matching for the booking that was clicked
    useEffect(
        () => {
            fetch(`http://localhost:8088/bookings?_expand=user&id=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleBooking = data[0]
                    updateBooking(singleBooking)
                })
        },
        [bookingId]
    )

    //gets all customers and their related user data
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers`)
                .then(response => response.json())
                .then((customerArray) => {
                    updateCustomers(customerArray)
                })
        },
        []
    )

    const deleteBooking = (id) => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                navigate("/bookings")
            })
    }

    //sorts customer array to find customer mathing current booking
    let singleCustomer = {}
    for (const customer of customers) {
        if (booking.userId === customer.userId)
            singleCustomer = customer
    }

    return <section className="booking">
        <header className="booking__header">Event for {singleCustomer.businessName}</header>
        <div>Booked by: {booking?.user?.fullName} (Email: {booking?.user?.email})</div>
        <div>To be held at: {booking.location}</div>
        <div>For {booking.hours} hours, with {booking.stations} massage chair stations</div>
        <div>Rate: ${booking.rate}</div>
        <div>At {booking.startTime} on {booking.startDate}</div>
        <div>Additional Notes: {booking.notes}</div>
        <footer className="booking__footer">Current Event Status: {booking.status}
        {
            massageUserObject.staff
                ? <button onClick={() => deleteBooking(booking.id)}>Delete Event</button>
                : ""
        }</footer>
    </section>
}