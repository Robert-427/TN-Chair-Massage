export const newCustomer = (createdUser) => {
    let customer = {
        userId: 0,
        businessName: "",
        businessStreetAddress: "",
        businessTown: "",
        businessState: "",
        businessZipCode: 0,
        businessNumber: ""
    }
    customer.userId = createdUser.id

    return fetch("http://localhost:8088/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
        .then(res => res.json())
}
