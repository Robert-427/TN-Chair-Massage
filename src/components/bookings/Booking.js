import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap"

export const Booking = ({ bookingObject, currentUser }) => {
    const navigate = useNavigate()

    const deleteBooking = (id) => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                navigate("/bookings")
            })
    }

    const [updatedBooking, update] = useState({
        userId: bookingObject.userId,
            rate: bookingObject.rate,
            hours: bookingObject.hours,
            stations: bookingObject.stations,
            status: bookingObject.status,
            startTime: bookingObject.startTime,
            startDate: bookingObject.startDate,
            location: bookingObject.location,
            notes: bookingObject.notes,
            canceledDate: bookingObject.canceledDate
    })

    const dropDown = () => {
        return (<div>
            <UncontrolledDropdown className="me-2" direction="down">
                <DropdownToggle caret color="primary">
                    {bookingObject.status}
                </DropdownToggle>
                <DropdownMenu className="status-dropdown">
                    <DropdownItem onClick={
                            (evt) => {
                                const copy = { ...updatedBooking }
                                copy.status = "Pending"
                                update(copy)
                            }}>
                        Pending
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={
                            (evt) => {
                                const copy = { ...updatedBooking }
                                copy.status = "Approved"
                                update(copy)
                            }}>
                        Approved
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={
                            (evt) => {
                                const copy = { ...updatedBooking }
                                copy.status = "Denied"
                                update(copy)
                            }}>
                        Denied
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
        )
    }

    const changeStatus = () => {
        return fetch(`http://localhost:8088/bookings/${bookingObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBooking)
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
        <footer className="booking__footer">Current Event Status:
            {
                currentUser.staff
                    ? dropDown(bookingObject)
                    : ` ${bookingObject.status}`
            }
            {
                currentUser.staff
                    ? <Button color="danger" onClick={() => deleteBooking(bookingObject.id)}>Delete</Button>
                    : ""
            }</footer>
    </section>
}
