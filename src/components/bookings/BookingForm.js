import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap"

//BookingForm will create new bookings from customer view
export const BookingForm = () => {
    const [hours, setHours] = useState([])
    const [stations, setStations] = useState([])
    const [states, setStates] = useState([])
    const navigate = useNavigate()

    const [booking, update] = useState({
        userId: 0,
        rate: 0,
        hours: 0,
        stations: 0,
        status: "Pending",
        startTime: "",
        startDate: "",
        address: "",
        city: "",
        state: "Tennessee",
        zip: 0,
        notes: "",
        canceledDate: "",
        canceledBy: ""
    })

    //gets local storage user info
    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    //gets hours info for form dropdown
    useEffect(
        () => {
            fetch(`http://localhost:8088/hours`)
                .then(response => response.json())
                .then((hourArray) => {
                    setHours(hourArray)
                })
        },
        []
    )

    //gets stations info for form dropdown
    useEffect(
        () => {
            fetch(`http://localhost:8088/stations`)
                .then(response => response.json())
                .then((stationArray) => {
                    setStations(stationArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/states`)
                .then(response => response.json())
                .then((statesArray) => {
                    setStates(statesArray)
                })
        },
        []
    )

    //sends new booking data to API
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const bookingToSendToAPI = {
            userId: massageUserObject.id,
            rate: booking.rate,
            hours: booking.hours,
            stations: booking.stations,
            status: "Pending",
            startTime: booking.startTime,
            startDate: booking.startDate,
            address: booking.address,
            city: booking.city,
            state: booking.state,
            zip: booking.zip,
            notes: booking.notes,
            canceledDate: ""
        }

        return fetch(`http://localhost:8088/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/bookings")
            })
    }

    //creates a form for customers to fill out all relevant data about their even
    return (
        <form className="bookingForm">
            <h2 className="bookingFrom__title">Booking New Event</h2>
            <Row>
                <Col md={2}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="hours">How many Hours: </label>
                            <UncontrolledDropdown className="me-2" direction="down">
                                <DropdownToggle caret color="light" >
                                    {booking.hours}
                                </DropdownToggle>
                                <DropdownMenu className="sort-dropdown">
                                    {hours.map(hour => {
                                        return (
                                            <DropdownItem key={hour.id} value={hour.id} className="hour" onClick={
                                                (evt) => {
                                                    const copy = { ...booking }
                                                    copy.hours = parseInt(evt.target.value)
                                                    copy.rate = (copy.stations * copy.hours * 75)
                                                    update(copy)
                                                }
                                            }>
                                                {hour.length}
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </fieldset>
                </Col>
                <Col md={3}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="stations">How many Massage Stations: </label>
                            <UncontrolledDropdown className="me-2" direction="down">
                                <DropdownToggle caret color="light" >
                                    {booking.stations}
                                </DropdownToggle>
                                <DropdownMenu className="sort-dropdown">
                                    {stations.map(station => {
                                        return (
                                            <DropdownItem key={station.id} value={station.id} className="station" onClick={
                                                (evt) => {
                                                    const copy = { ...booking }
                                                    copy.stations = parseInt(evt.target.value)
                                                    copy.rate = (copy.stations * copy.hours * 75)
                                                    update(copy)
                                                }
                                            }>
                                                {station.therapists}
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </fieldset>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="time">Time:</label>
                            <input
                                required autoFocus
                                type="time"
                                className="form-control"
                                placeholder="Time event is to start"
                                value={booking.startTime}
                                onChange={
                                    (evt) => {
                                        const copy = { ...booking }
                                        copy.startTime = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </Col>
                <Col md={3}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input
                                required autoFocus
                                type="date"
                                className="form-control"
                                placeholder="Date of the event"
                                value={booking.startDate}
                                onChange={
                                    (evt) => {
                                        const copy = { ...booking }
                                        copy.startDate = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="location">Location:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Address of event..."
                                value={booking.location}
                                onChange={
                                    (evt) => {
                                        const copy = { ...booking }
                                        copy.address = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </Col>
                <Col md={3}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="City..."
                                value={booking.city}
                                onChange={
                                    (evt) => {
                                        const copy = { ...booking }
                                        copy.city = evt.target.value
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </Col>
                <Col md={2}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="state">State:</label>
                            <UncontrolledDropdown className="me-2" direction="down">
                                <DropdownToggle caret color="light" >
                                    {booking.state}
                                </DropdownToggle>
                                <DropdownMenu className="sort-dropdown">
                                    {states.map(state => {
                                        return (
                                            <DropdownItem key={state.id} value={state.name} className="state--name" onClick={
                                                (evt) => {
                                                    const copy = { ...booking }
                                                    copy.state = evt.target.value
                                                    update(copy)
                                                }
                                            }>
                                                {state.name}
                                            </DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </fieldset>
                </Col>
                <Col md={2}>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="zip">Zip Code:</label>
                            <input
                                required autoFocus
                                type="number"
                                className="form-control"
                                placeholder="Zip Code..."
                                onChange={
                                    (evt) => {
                                        const copy = { ...booking }
                                        copy.zip = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </Col>
            </Row>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes:</label>
                    <input
                        required autoFocus
                        type="textarea"
                        className="form-control"
                        placeholder="Additional note here..."
                        value={booking.notes}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.notes = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <Button color="primary"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Event
            </Button>
        </form>
    )
}
