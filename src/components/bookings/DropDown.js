import { useState } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

export const DropStatus = ({ bookingObject, bookingUpdate }) => {

    const statusColor = () => {
        if (bookingObject.status === "Pending") {
            return "warning"
        } else if (bookingObject.status === "Approved") {
            return "success"
        } else {
            return "danger"
        }
    }

    const Canceled = (args) => {
        const [modal, setModal] = useState(false);

        const toggle = () => setModal(!modal);

        return (
            <div>
                <Button color="danger" outline onClick={toggle}>{bookingObject.status}</Button>
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
        );
    }

    if (bookingObject.canceledDate === "") {
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

export const DropSort = ({setPendingBookings, setApprovedBooking, setDeniedBookings, setCanceledBookings}) => {

    return <div>
        <UncontrolledDropdown className="me-2" direction="down">
            <DropdownToggle caret color="primary" >
                Sort Bookings
            </DropdownToggle>
            <DropdownMenu className="sort-dropdown">
                <DropdownItem onClick={() => { setPendingBookings(true) }}>
                    Pending
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { setApprovedBooking(true) }}>
                    Approved
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { setDeniedBookings(true) }}>
                    Denied
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { setCanceledBookings(true) }}>
                    Canceled
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => { setPendingBookings(false) && setApprovedBooking(false) && setDeniedBookings(false) && setCanceledBookings(false)}}>
                    All Bookings
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </div>
}