import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const BookingDetails = () => {
    const [customers, updateCustomers] = useState([])
    const [booking, updateBooking] = useState({})
    const { bookingId } = useParams()

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
        <footer className="booking__footer">Current Event Status: {booking.status}</footer>
    </section>
}