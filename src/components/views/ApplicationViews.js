import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

    //gets local storage user info
    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    //shows differnt page views for either staff or customers
    if (massageUserObject.staff) {
        return <EmployeeViews />
    } else {
        return <CustomerViews />
    }
}
