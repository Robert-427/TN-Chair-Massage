import React, { useState } from "react";
import { Navbar, Collapse, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css";

export const CustomerNav = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    //customer Navbar Hamburger style
    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="me-auto">TNCM</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="me-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar >
                        <NavItem>
                            <NavLink href="/bookings" className='border-bottom m-0'>Bookings</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="" onClick={() => { localStorage.removeItem("massage_user") }}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}



{/* todo - add link or delete zombie code 
<NavItem>
    <NavLink href="/profile" className='border-bottom m-0'>Profile</NavLink>
</NavItem> 
*/}
