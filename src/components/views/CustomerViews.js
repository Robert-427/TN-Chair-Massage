import { Outlet, Route, Routes } from "react-router-dom"
import { BookingDetails } from "../bookings/BookingDetail"
import { BookingForm } from "../bookings/BookingForm"
import { BookingList } from "../bookings/BookingList"
// import { Profile } from "../profile/Profile"


export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Tennessee Chair Massage</h1>
                    <div>Your office. Our massage skills</div>

                    <Outlet />
                </>
            }>

                {/* <Route path="profile" element={ <Profile />} /> */}
                <Route path="bookings" element={ <BookingList />} />
                <Route path="bookings/create" element={ <BookingForm />} />
                <Route path="bookings/:bookingId" element={ <BookingDetails />} />
            </Route>
        </Routes>
    )
}
