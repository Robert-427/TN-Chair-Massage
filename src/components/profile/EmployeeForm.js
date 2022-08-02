import { useEffect, useState } from "react"
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, UncontrolledDropdown } from "reactstrap"
import { Success } from "./Model"

export const EmployeeForm = () => {
    const [states, setStates] = useState([])
    const [profile, updateProfile] = useState({
        id: 0,
        userId: 0,
        streetAddress: "",
        town: "",
        state: "",
        zipCode: 0,
        phoneNumber: "",
        massageLicenceNumber: 0
    })

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    const getAllEmployees = () => {
        fetch(`http://localhost:8088/staff?&userId=${massageUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const singleEmployee = data[0]
                updateProfile(singleEmployee)
            })
    }

    //sets all bookings
    useEffect(
        () => { getAllEmployees() },
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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/staff/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                toggle()
            })
    }

    return <>
        <h2 className="profile__header"> Welcome {massageUserObject.name}</h2>
        <h2 className="profile__subheader">Please edit your profile</h2>
        <Form>
            <Row>
                <Col md={3}>
                    <FormGroup>
                        <Label for="streetAddress">
                            Address:
                        </Label>
                        <Input
                            id="streetAddress"
                            name="streetAddress"
                            value={profile.streetAddress}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.streetAddress = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for="phoneNumber">
                            Phone Number:
                        </Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.phoneNumber = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                        />
                    </FormGroup>

                </Col>
            </Row>
            <Row>
                <Col md={2}>
                    <FormGroup>
                        <Label for="town">
                            City:
                        </Label>
                        <Input
                            id="town"
                            name="town"
                            value={profile.town}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.town = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for="state">
                            State:
                        </Label>
                        <UncontrolledDropdown className="me-2" direction="down">
                            <DropdownToggle caret color="light" >
                                {profile.state}
                            </DropdownToggle>
                            <DropdownMenu className="sort-dropdown">
                                {states.map(state => {
                                    return (
                                        <DropdownItem key={state.id} value={state.name} className="state--name" onClick={
                                            (evt) => {
                                                const copy = { ...profile }
                                                copy.state = evt.target.value
                                                updateProfile(copy)
                                            }
                                        }>
                                            {state.name}
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </FormGroup>
                </Col>
                <Col md={1}>
                    <FormGroup>
                        <Label for="zipCode">
                            Zip Code:
                        </Label>
                        <Input
                            id="zipCode"
                            name="zipCode"
                            value={profile.zipCode}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.zipCode = parseInt(evt.target.value)
                                    updateProfile(copy)
                                }
                            }
                        />
                    </FormGroup>

                </Col>
            </Row>
            <Row>
                <Col md={5}>
                    <FormGroup>
                        <Label for="massageLicenceNumber">
                            Massage Licence Number:
                        </Label>
                        <Input
                            id="massageLicenceNumber"
                            name="massageLicenceNumber"
                            value={profile.massageLicenceNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.massageLicenceNumber = parseInt(evt.target.value)
                                    updateProfile(copy)
                                }
                            }
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button color="primary" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                Update
            </Button>
        </Form>
        <Success className={"modal--className"} modal={modal} toggle={toggle} />
    </>
}
