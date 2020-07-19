import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../../context/auth'
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import NavToggler from '../navToggler/index'

export default function Menu() {
    const {auth, onLogout} = useAuth()

    const style = {
        color: '#fff',
        fontWeight: "bold",
        backgroundColor: '#252422',
        padding: '.35rem 2rem',
        borderRadius: '20px'
    }

    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        auth.isAuth ? (
            <Navbar color="white" light expand="md">
                <Link to="/" className="navbar-brand">Home</Link>
                <NavToggler 
                    toggle={toggle} 
                    open={isOpen}
                />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/public-route" className="nav-link">Public Route</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/private-route" className="nav-link">Private Route</Link>
                        </NavItem>
                    </Nav>
                    <Link to="/logout" style={style} onClick={onLogout}>Logout</Link>
                </Collapse>
            </Navbar>
        ) : (
            <Navbar color="white" light expand="md">
                <Link to="/" className="navbar-brand">Home</Link>
                <NavToggler 
                    toggle={toggle} 
                    open={isOpen}
                />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link to="/public-route" className="nav-link">Public Route</Link>
                        </NavItem>
                    </Nav>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" style={style}>Register</Link>
                </Collapse>
            </Navbar>
        )
    )
}


