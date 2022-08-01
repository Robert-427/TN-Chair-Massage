export const newStaff = (createdUser) => {
    let staff = {
        userId: 0,
        streetAddress: "",
        town: "",
        state: "",
        zipCode: 0,
        phoneNumber: "",
        massageLicenceNumber: 0
    }
    staff.userId = createdUser.id

    return fetch("http://localhost:8088/staff", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(staff)
    })
        .then(res => res.json())
}
