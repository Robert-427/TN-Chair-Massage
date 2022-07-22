import { Link } from "react-router-dom"

export const Booking = ({ bookingObject }) => {



    return <section className="booking" key={`booking--${bookingObject.id}`}>
        <header className="booking__header">
            <Link to={`/bookings/${bookingObject.id}`}>Event at {bookingObject.location}</Link>
        </header>
        <section>Date: {bookingObject.startDate}</section>
        <footer className="booking__footer">Current Event Status: {bookingObject.status}</footer>
    </section>
}