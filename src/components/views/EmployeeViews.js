import { Outlet, Route, Routes } from "react-router-dom"
import { BookingDetails } from "../bookings/BookingDetail"
import { BookingList } from "../bookings/BookingList"
import { Profile } from "../profile/Profile"
import { Home } from "./HomePage"

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
                <Route path="profile" element={ <Profile />} />
                <Route path="home" element={ <Home />} />
            </Route>
        </Routes>
    )
}
