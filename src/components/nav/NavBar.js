import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {

    //gets local storage user info
    const localMassageUser = localStorage.getItem("massage_user")
    const massageUserObject = JSON.parse(localMassageUser)

    //different nav bars active for either staff or customers
    if (massageUserObject.staff) {
        return <EmployeeNav />
    } else {
        return <CustomerNav />
    }
}
