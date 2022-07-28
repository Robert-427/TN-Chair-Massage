import { Outlet, Route, Routes } from "react-router-dom"
import { BookingDetails } from "../bookings/BookingDetail"
import { BookingList } from "../bookings/BookingList"

//Sets up page for customer with links navbar will use
export const EmployeeViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="headerBar">
                        <h1>Tennessee Chair Massage</h1>
                        <div>Your office. Our massage skills</div>
                    </div>

                    <Outlet />
                </>
            }>
                <Route path="bookings" element={<BookingList />} />
                <Route path="bookings/:bookingId" element={<BookingDetails />} />
            </Route>
        </Routes>
    )
}

{/*     todo - add link(s) or delete zombie code
<Route path="tickets" element={ <TicketContainer /> } />
<Route path="employees" element={ <EmployeeList /> } />
<Route path="employees/:employeeId" element={ <EmployeeDetails />} />
<Route path="customers" element={ <CustomerList /> } />
<Route path="customers/:customerId" element={ <CustomerDetails />} />
<Route path="profile" element={ <Profile />} /> 
*/}
// import { EmployeeDetails } from "../employees/EmployeeDetails"
// import { EmployeeList } from "../employees/EmployeeList"
// import { TicketContainer } from "../tickets/TicketContainer"
// import { CustomerDetails } from "../customers/CustomerDetails"
// import { CustomerList } from "../customers/CustomerList"
// import { Profile } from "../profile/Profile"
