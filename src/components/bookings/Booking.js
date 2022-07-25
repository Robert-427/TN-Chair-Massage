import { Link } from "react-router-dom"

export const Booking = ({ bookingObject }) => {

    const deleteBooking = (id) => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                navigate("/bookings")
            })
    }

    return <section className="booking" key={`booking--${bookingObject.id}`}>
        <header className="booking__header">
            <Link to={`/bookings/${bookingObject.id}`}>Event at {bookingObject.location}</Link>
        </header>
        <section>Date: {bookingObject.startDate}</section>
        <footer className="booking__footer">Current Event Status: {bookingObject.status}
        {
            massageUserObject.staff
                ? <button onClick={() => deleteBooking(bookingObject.id)}>Delete Event</button>
                : ""
        }</footer>
    </section>
}