import { useState } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

export const DropDown = ({ bookingObject, bookingUpdate }) => {

    const Canceled = (args) => {
        const [modal, setModal] = useState(false);

        const toggle = () => setModal(!modal);

        return (
            <div>
                <Button color="danger" outline onClick={toggle}>{bookingObject.status}</Button>
                <Modal isOpen={modal} toggle={toggle} {...args}>
                    <ModalHeader toggle={toggle}>Event at {bookingObject.location}</ModalHeader>
                    <ModalBody>
                        This event has been canceled on {bookingObject.canceledDate}, and it's status can not be changed.
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
                <DropdownToggle caret color="primary" outline>
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
