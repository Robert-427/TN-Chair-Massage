import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

//handles all login procedures
export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    //gets user informatino from API to store in local storage
    //if email doesn't match API, triggers alert window
    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("massage_user", JSON.stringify({
                        id: user.id,
                        staff: user.isStaff
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    //creates the login page that accepts email input and checks it against API users
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>TN Chair Massage</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
