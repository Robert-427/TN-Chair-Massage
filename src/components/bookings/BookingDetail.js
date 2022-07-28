import { Button, Card, CardBody, CardFooter, CardLink, CardText, CardTitle, ListGroup, ListGroupItem } from "reactstrap"
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

    //gets all customers data and stores in an array
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

    //sorts customer array to find customer matching current booking
    let singleCustomer = {}
    for (const customer of customers) {
        if (booking.userId === customer.userId)
            singleCustomer = customer
    }

    //allows specific booking to be removed from API
    const deleteBooking = (id) => {
        return fetch(`http://localhost:8088/bookings/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(() => {
                navigate("/bookings")
            })
    }

    const notes = () => {
        if (booking.notes === "") {
            return ` There are no notes attached.`
        } else {
            return ` ${booking.notes}`
        }
    }

    const staffButton = () => {
        if (massageUserObject.staff) {
            return <Button color="danger" onClick={() => deleteBooking(booking.id)}>Delete Event</Button>
        } else {
            return ""
        }
    }

    const footer = () => {
        if (booking.canceledDate === "") {
            return `Current Event Status: ${booking.status}`
        } else {
            return `Event canceled on ${booking.canceledDate}`
        }
    }

    //returns listing of booking with all relevant details, pulled from booking, user, and customer data
    return <Card
        style={{
            width: '30rem'
        }}
    >
        {/* <img
            alt="Card image"
            src="https://picsum.photos/300/200"
        /> */}
        <CardBody>
            <CardTitle tag="h5">
                Event for {singleCustomer.businessName}
            </CardTitle>
            <CardText>
                Booked by: {booking?.user?.fullName} (Email: {booking?.user?.email})
            </CardText>
        </CardBody>
        <ListGroup flush>
            <ListGroupItem>
                To be held at: {booking.location}
            </ListGroupItem>
            <ListGroupItem>
                Starting at {booking.startTime} on {booking.startDate}
            </ListGroupItem>
            <ListGroupItem>
                For {booking.hours} hours, with {booking.stations} massage chair stations
            </ListGroupItem>
            <ListGroupItem>
                Cost: ${booking.rate}
            </ListGroupItem>
            <ListGroupItem>
                Additional Notes: {notes()}
            </ListGroupItem>
        </ListGroup>
        <CardFooter className="card__footer">
            {footer()} {staffButton()}
        </CardFooter>
    </Card>
}
