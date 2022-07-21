import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    if (massageUserObject.staff) {
        return <EmployeeViews />
    } else {
        return <CustomerViews />
    }
}
