import { Outlet, Route, Routes } from "react-router-dom"
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
            </Route>
        </Routes>
    )
}
