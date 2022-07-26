import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap"

export const Booking = ({ bookingObject, currentUser, getAllBookings }) => {
    const navigate = useNavigate()

    //function to delete a specific booking from API
    const deleteBooking = (id) => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                navigate("/bookings")
            })
    }

    //takes updated info from dropdown and edits API, then re-gets all bookings
    const bookingUpdate = (copy) => {
        return fetch(`http://localhost:8088/bookings/${bookingObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(() => {
                getAllBookings()
            })
    }

    //if a booking has been neither canceled nor denied, then the customer has the option to cancel
    const canCancel = () => {
        if (bookingObject.canceledDate === "" && bookingObject.status !== "Denied") {
            return <Button color="danger" onClick={
                (evt) => {
                    const copy = { ...bookingObject }
                    copy.canceledDate = new Date()
                    copy.status = "Canceled"
                    cancelBooking(copy)
                }}>Cancel Event
            </Button>
        } else {
            return ""
        }
    }

    //updates booking API with canceled date
    const cancelBooking = (copy) => {
        return fetch(`http://localhost:8088/bookings/${bookingObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
            .then(response => response.json())
            .then(() => {
                getAllBookings()
            })
    }

    //dropdown function to allow chaning of status of specific bookings
    //"bookingUpdate(copy)" sends info to API directly, without first altering State
    //State changed once new info is gotten at end of "bookingUpdate()"
    const dropDown = () => {
        return (<div>
            <UncontrolledDropdown className="me-2" direction="down">
                <DropdownToggle caret color="primary">
                    {bookingObject.status}
                </DropdownToggle>
                <DropdownMenu className="status-dropdown">
                    <DropdownItem onClick={
                        (evt) => {
                            const copy = { ...bookingObject }
                            copy.status = "Pending"
                            copy.canceledDate = ""
                            bookingUpdate(copy)
                        }}>
                        Pending
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={
                        (evt) => {
                            const copy = { ...bookingObject }
                            copy.status = "Approved"
                            bookingUpdate(copy)
                        }}>
                        Approved
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={
                        (evt) => {
                            const copy = { ...bookingObject }
                            copy.status = "Denied"
                            bookingUpdate(copy)
                        }}>
                        Denied
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
        )
    }

    //Shows basic individual booking objects, with link to detail view
    //staff get dropdown function to change status, and delete function to remove booking
    //customer can see value of status
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
                    ? ""
                    : canCancel()
            }</footer>
    </section>
}
