import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const BookingDetails = () => {
    const [customer, updateCustomer] = useState({})
    const [booking, updateBookings] = useState({})
    const { bookingId } = useParams()

    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/bookings?_expand=user&id=${bookingId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleBooking = data[0]
                    updateBookings(singleBooking)
                })
        },
        [bookingId]
    )

    //gets customer and their related user data
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?userId=${massageUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                })
        },
        []
    )

    return <section className="booking">
        <header className="booking__header">Event for {customer.businessName}</header>
        <div>Booked by: {booking?.user?.fullName} (Email: {booking?.user?.email})</div>
        <div>To be held at: {booking.location}</div>
        <div>For {booking.hours} hours, with {booking.stations} massage chair stations</div>
        <div>Rate: ${booking.rate}</div>
        <div>At {booking.startTime} on {booking.startDate}</div>
        <div>Additional Notes: {booking.notes}</div>
        <footer className="booking__footer">Current Event Status: {booking.status}</footer>
    </section>
}