import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    const role = localStorage.getItem('role');
    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">MyFinBank</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {!isAuthenticated ? (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        </>
                    ) : (
                        <>
                            {role === 'admin' && (
                                <>
                                    <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
                                    {/* Add other admin links here */}
                                </>
                            )}
                            {role === 'user' && (
                                <>
                                    <Nav.Link as={Link} to="/user-dashboard">User Dashboard</Nav.Link>
                                    {/* Add other user links here */}
                                </>
                            )}
                        </>
                    )}
                </Nav>
                {isAuthenticated && (
                    <Nav className="ml-auto">
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
