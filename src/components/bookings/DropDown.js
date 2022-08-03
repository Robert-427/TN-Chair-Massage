import { useState } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink } from "reactstrap"

//drop down to change the status of each booking event
export const DropStatus = ({ bookingObject, bookingUpdate }) => {

    //changes the color based on the status
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

    const Canceled = (args) => {
        const [modal, setModal] = useState(false);

        const toggle = () => setModal(!modal);

        if (bookingObject.status === "Canceled") {
            return (
                <div>
                    <Button color={statusColor()} outline onClick={toggle}>{bookingObject.status}</Button>
                    <Modal isOpen={modal} toggle={toggle} {...args}>
                        <ModalHeader toggle={toggle}>Event at {bookingObject.location}</ModalHeader>
                        <ModalBody>
                            This event was canceled on {bookingObject.canceledDate}, and it's status can not be changed.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Close</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <Button color={statusColor()} onClick={toggle}>{bookingObject.status}</Button>
                    <Modal isOpen={modal} toggle={toggle} {...args}>
                        <ModalHeader toggle={toggle}>Event at {bookingObject.location}</ModalHeader>
                        <ModalBody>
                            This event has been Archived, and it's status can not be changed.
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggle}>Close</Button>{' '}
                        </ModalFooter>
                    </Modal>
                </div>
            )
        }
    }

    if (bookingObject.canceledDate === "" && bookingObject.status !== "Archived") {
        return (<div>
            <UncontrolledDropdown className="me-2" direction="down">
                <DropdownToggle caret color={statusColor()} outline>
                    {bookingObject.status}
                </DropdownToggle>
                <DropdownMenu className="status-dropdown">
                    <DropdownItem onClick={
                        (evt) => {
                            const copy = { ...bookingObject }
                            copy.status = "Pending"
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
    } else {
        return Canceled()
    }
}

//drop down for showing and performing the sort functions
export const DropSort = ({ setPendingBookings, setApprovedBooking, setDeniedBookings, setCanceledBookings }) => {

    //sets all searches to false
    const reset = () => {
        setPendingBookings(false)
        setApprovedBooking(false)
        setDeniedBookings(false)
        setCanceledBookings(false)
    }

    //sets only pending to true
    const pending = () => {
        setPendingBookings(true)
        setApprovedBooking(false)
        setDeniedBookings(false)
        setCanceledBookings(false)
    }

    //sets only approved to true
    const approved = () => {
        setPendingBookings(false)
        setApprovedBooking(true)
        setDeniedBookings(false)
        setCanceledBookings(false)
    }

    //sets only denied to true
    const denied = () => {
        setPendingBookings(false)
        setApprovedBooking(false)
        setDeniedBookings(true)
        setCanceledBookings(false)
    }

    //sets only canceled to true
    const canceled = () => {
        setPendingBookings(false)
        setApprovedBooking(false)
        setDeniedBookings(false)
        setCanceledBookings(true)
    }


    return <div>
        <UncontrolledDropdown className="me-2" direction="down">
            <DropdownToggle caret color="primary" >
                Sort Bookings
            </DropdownToggle>
            <DropdownMenu className="sort-dropdown">
                <DropdownItem onClick={() => { reset() }}>
                    All Bookings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { pending(true) }}>
                    Pending
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { approved(true) }}>
                    Approved
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { denied(true) }}>
                    Denied
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { canceled(true) }}>
                    Canceled
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    <NavLink href="archive" className="archive">Archived</NavLink>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </div>
}
