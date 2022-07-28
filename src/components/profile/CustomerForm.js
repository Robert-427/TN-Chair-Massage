import { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"

export const CustomerForm = () => {
    const [customer, setCustomer] = useState([])

    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    const getAllCustomers = () => {
        fetch(`http://localhost:8088/customers?&userid=${massageUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                setCustomer(singleCustomer)
            })
    }

    //sets all bookings
    useEffect(
        () => { getAllCustomers() },
        []
    )

    return <Form>
        <Row>
            <Col md={3}>
                <FormGroup>
                    <Label for="businessName">
                        Name of your Business
                    </Label>
                    <Input
                        id="businessName"
                        name="businessName"
                        placeholder={customer.businessName}
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
                        placeholder={customer.businessNumber}
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
                        placeholder={customer.businessStreetAddress}
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
                        placeholder={customer.businessTown}
                    />
                </FormGroup>
            </Col>
            <Col md={2}>
                <FormGroup>
                    <Label for="businessState">
                        State
                    </Label>
                    <Input
                        id="businessState"
                        name="businessState"
                        placeholder={customer.businessState}
                    />
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
                        placeholder={customer.businessZipCode}
                    />
                </FormGroup>
            </Col>
        </Row>
        <Button color="primary">
            Update
        </Button>
    </Form>
}
