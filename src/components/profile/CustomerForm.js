import { useEffect, useState } from "react"
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label, Row, UncontrolledDropdown } from "reactstrap"
import { Success } from "./Model"

export const CustomerForm = () => {
    const [states, setStates] = useState([])
    const [profile, updateProfile] = useState({
        id: 0,
        userId: 0,
        businessName: "",
        businessStreetAddress: "",
        businessTown: "",
        businessState: "",
        businessZipCode: 0,
        businessNumber: ""
    })

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    const getThisCustomer = () => {
        fetch(`http://localhost:8088/customers?&userId=${massageUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateProfile(singleCustomer)
            })
    }

    //sets all bookings
    useEffect(
        () => { getThisCustomer() },
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

        return fetch(`http://localhost:8088/customers/${profile.id}`, {
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
                        <Label for="businessName">
                            Name of your Business
                        </Label>
                        <Input
                            id="businessName"
                            name="businessName"
                            placeholder="Enter your business name here..."
                            value={profile.businessName}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.businessName = evt.target.value
                                    updateProfile(copy)
                                }
                            }
                        />
                    </FormGroup>
                </Col>
                <Col md={2}>
                    <FormGroup>
                        <Label for="businessNumber">
                            Business Phone Number
                        </Label>
                        <Input
                            id="businessNumber"
                            name="businessNumber"
                            placeholder="Enter your business phone number here..."
                            value={profile.businessNumber}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.businessNumber = evt.target.value
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
                        <Label for="BusinessStreetAddress">
                            Street Address of your Business
                        </Label>
                        <Input
                            id="BusinessStreetAddress"
                            name="BusinessStreetAddress"
                            placeholder="Enter your business street address here..."
                            value={profile.businessStreetAddress}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.businessStreetAddress = evt.target.value
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
                        <Label for="businessTown">
                            City
                        </Label>
                        <Input
                            id="businessTown"
                            name="businessTown"
                            placeholder="Enter the town your business is in here..."
                            value={profile.businessTown}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.businessTown = evt.target.value
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
                                {profile.businessState}
                            </DropdownToggle>
                            <DropdownMenu className="sort-dropdown">
                                {states.map(state => {
                                    return (
                                        <DropdownItem key={state.id} value={state.name} className="state--name" onClick={
                                            (evt) => {
                                                const copy = { ...profile }
                                                copy.businessState = evt.target.value
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
                        <Label for="businessZipCode">
                            Zip
                        </Label>
                        <Input
                            id="businessZipCode"
                            name="businessZipCode"
                            placeholder="Enter your business zipcode here..."
                            value={profile.businessZipCode}
                            onChange={
                                (evt) => {
                                    const copy = { ...profile }
                                    copy.businessZipCode = parseInt(evt.target.value)
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
