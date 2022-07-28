import { CustomerForm } from "./CustomerForm"
import { EmployeeForm } from "./EmployeeForm"

export const Profile = () => {

    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    if (massageUserObject.staff) {
        return <EmployeeForm />
    } else {
        return <CustomerForm />
    }
}
