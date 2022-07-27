import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./TNCM.css"

//combines page views and navbars for overall page setup
export const TNCM = () => {
	return <>
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route path="*" element={
				<Authorized>
					<NavBar />
					<ApplicationViews />
					<div className="logo__container"></div>
				</Authorized>

			} />
		</Routes>
	</>
}

