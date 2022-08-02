import { Link, useNavigate } from "react-router-dom";
import { Button, CardHeader, ListGroup, ListGroupItem, Card, CardFooter } from "reactstrap"
import { DropStatus } from "./DropDown";

export const Booking = ({ bookingObject, currentUser, getAllBookings }) => {

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
        if (bookingObject.canceledDate === "" && bookingObject.status !== "Denied" && bookingObject.status !== "Archived" && currentUser.staff === false) {
            return <Button color={statusColor()} outline onClick={
                (evt) => {
                    const copy = { ...bookingObject }
                    copy.status = "Canceled"
                    copy.canceledDate = new Date().toLocaleString()
                    cancelBooking(copy)
                }}>Cancel Event
            </Button>
        } else {
            if (currentUser.staff === false)
                return <Button color="danger" disabled outline>Cancel Event</Button>
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

    const addedNotes = () => {
        if (bookingObject.notes === "") {
            return ` There are no notes attached.`
        } else {
            return ` ${bookingObject.notes}`
        }
    }

    const footer = () => {
        if (currentUser.staff) {
            return <CardFooter className="card__footer">
                <DropStatus bookingObject={bookingObject} bookingUpdate={bookingUpdate} />
            </CardFooter>
        } else {
            return <CardFooter className="card__footer">
                Status: {bookingObject.status}      {canCancel()}
            </CardFooter>
        }
    }

    const statusColor = () => {
        if (bookingObject.status === "Pending") {
            return "warning"
        } else if (bookingObject.status === "Approved") {
            return "success"
        } else if (bookingObject.status === "Archived") {
            return "secondary"
        } else {
            return "danger"
        }
    }

    //Shows basic individual booking objects, with link to detail view
    //staff get dropdown function to change status, and delete function to remove booking
    //customer can see value of status
    return <Card className="booking" key={`booking--${bookingObject.id}`}
        color={statusColor()}
        outline
        style={{
            width: '23rem'
        }}
    >
        <CardHeader tag="h5">
            <Link to={`/bookings/${bookingObject.id}`}>Event at {bookingObject.location}</Link>
        </CardHeader>
        <ListGroup flush>
            <ListGroupItem>
                Date: {bookingObject.startDate}
            </ListGroupItem>
            <ListGroupItem>
                Notes: {addedNotes()}
            </ListGroupItem>
            {footer()}
        </ListGroup>
    </Card>
}

