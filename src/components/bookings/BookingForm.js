import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"

//BookingForm will create new bookings from customer view
export const BookingForm = () => {
    const [hours, setHours] = useState([])
    const [stations, setStations] = useState([])
    const navigate = useNavigate()

    const [booking, update] = useState({
        userId: 0,
        rate: 0,
        hours: 0,
        stations: 0,
        status: "Pending",
        startTime: "",
        startDate: "",
        location: "",
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
            location: booking.location,
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hours">How many Hours: </label>
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.hours = parseInt(evt.target.value)
                                copy.rate = (copy.stations * copy.hours * 75)
                                update(copy)
                            }
                        }>
                        <option value={0}>Select...</option>
                        {hours.map(
                            (hour) => {
                                return (
                                    <option key={hour.id} className="hour__length" name="hour__length" value={hour.id}>
                                        {hour.length}
                                    </option>)
                            }
                        )
                        } </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="stations">How many Massage Stations: </label>
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.stations = parseInt(evt.target.value)
                                copy.rate = (copy.stations * copy.hours * 75)
                                update(copy)
                            }
                        }>
                        <option value={0}>Select...</option>
                        {stations.map(
                            (station) => {
                                return (
                                    <option key={station.id} className="station__therapists" name="station__therapists" value={station.id}>
                                        {station.therapists}
                                    </option>)
                            }
                        )
                        } </select>
                </div>
            </fieldset>
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Location Event's full addresss..."
                        value={booking.location}
                        onChange={
                            (evt) => {
                                const copy = { ...booking }
                                copy.location = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
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
