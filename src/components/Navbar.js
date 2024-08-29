import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Chat from './Chat';


const NavigationBar = () => {
    const role = localStorage.getItem('role');
    const isAuthenticated = !!localStorage.getItem('token');
    const [showChat, setShowChat] = useState(false); // State to control the modal visibility

    const handleShowChat = () => setShowChat(true);
    const handleCloseChat = () => setShowChat(false);


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <>
            <Navbar bg="primary" expand="lg">
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
                                        <Nav.Link as={Link} to="#" onClick={handleShowChat}>
                                            Chat
                                        </Nav.Link>


                                    </>
                                )}
                                {role === 'user' && (
                                    <>
                                        <Nav.Link as={Link} to="/user-dashboard">User Dashboard</Nav.Link>
                                        {/* Add other user links here */}
                                        <Nav.Link as={Link} to="#" onClick={handleShowChat}>
                                            Chat
                                        </Nav.Link>


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
            {/* Chat Modal */}
            <Modal show={showChat} onHide={handleCloseChat} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Chat />
                </Modal.Body>
            </Modal>
        </>

    );
};

export default NavigationBar;
