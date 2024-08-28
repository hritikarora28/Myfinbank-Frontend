import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Chat from './Chat';
import Notification from './Notification';

const API_URL = 'http://localhost:5000';

const Dashboard = () => {
    // const [data, setData] = useState({});
    const [userData, setUserData] = useState(null);
    const [adminData, setAdminData] = useState([]);
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = role === 'admin' ? `${API_URL}/api/admins/users` : `${API_URL}/api/users/details`;
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (role === 'admin') {
                    setAdminData(response.data);
                } else {
                    setUserData(response.data);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally set error state to show a user-friendly message
            }
        };

        if (role) {
            fetchData();
        }
    }, [role]);

    const toggleUserStatus = async (userId) => {
        try {
            await axios.put(`${API_URL}/api/admins/users/${userId}/toggle-active`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAdminData(prevData =>
                prevData.map(user =>
                    user._id === userId ? { ...user, isActive: !user.isActive } : user
                )
            );
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    };

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <h2>{role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h2>
                    <Alert variant="info">
                        {role === 'admin' ? 'Logged in as Admin' : 'Logged in as User'}
                    </Alert>
                </Col>
            </Row>

            {role === 'user' && (
                <div className="mb-4">
                    <Link to="/apply-loan" className="btn btn-primary me-2 my-2">Apply for Loan</Link>
                    <Link to="/view-loans" className="btn btn-primary me-2 my-2">View All Loans</Link>
                    <Link to="/repay-loan" className="btn btn-primary me-2 my-2">Repay Loan</Link>
                    <Link to="/transfer-money" className="btn btn-primary me-2 my-2">Transfer Money</Link>
                    <Link to="/deposit-money" className="btn btn-primary me-2 my-2">Deposit Money</Link>
                    <Link to="/withdraw-money" className="btn btn-primary me-2 my-2">Withdraw Money</Link>
                    <Link to="/view-transactions" className="btn btn-primary me-2 my-2">View Transactions</Link>
                    <Link to="/calculate-emi" className="btn btn-primary me-2 my-2">Calculate the Loan EMI</Link>
                    <Link to="/start-recurring" className="btn btn-primary me-2 my-2">Start Recurring Deposit</Link>
                    <Link to="/pay-recurring" className="btn btn-primary me-2 my-2">Pay for Recurring Deposit</Link>
                    <Link to="/view-recurring" className="btn btn-primary me-2 my-2">Show All Recurring Deposits</Link>
                    <Link to="/create-fd" className="btn btn-primary me-2">Create Fixed Deposit</Link>
                    <Link to="/withdraw-fd" className="btn btn-primary me-2">Withdraw Fixed Deposit</Link>
                    <Link to="/my-fd" className="btn btn-primary me-2 my-2">View Fixed Deposits</Link>

                    <Chat />
                </div>
            )}

            {role === 'admin' && (
                <div className="mb-4">
                    <Link to="/all-transactions" className="btn btn-primary me-2 my-2">See All Transaction</Link>
                    <Link to="/manage-loans" className="btn btn-primary me-2 my-2">Manage and View Loans</Link>
                    {/* <Link to="/see-total-amount" className="btn btn-primary me-2 my-2">See Total Amount</Link> */}
                    {/* <Link to="/see-number-loans" className="btn btn-primary me-2 my-2">See Number of Loans Going On</Link>
                    <Link to="/see-pending-loans" className="btn btn-primary me-2 my-2">See Pending Loans</Link>
                    <Link to="/see-approved-loans" className="btn btn-primary me-2 my-2">See Approved Loans</Link> */}
                    <Link to="/all-fd" className="btn btn-primary me-2 my-2">View All Fixed Deposit</Link>
                    <Link to="/all-recurring-deposits" className="btn btn-primary me-2 my-2">View All Recurring Deposits</Link>
                    <Notification />
                </div>
            )}

            {role === 'user' && userData && (
                <div className="mb-4">
                    <h4>User Details</h4>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Balance:</strong> {userData.balance}</p>
                </div>
            )}

            {role === 'admin' && Array.isArray(adminData) && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminData.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.balance}</td>
                                <td>{user.isActive ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <Button
                                        variant={user.isActive ? 'danger' : 'success'}
                                        onClick={() => toggleUserStatus(user._id)}
                                    >
                                        {user.isActive ? 'Deactivate' : 'Activate'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Dashboard;
