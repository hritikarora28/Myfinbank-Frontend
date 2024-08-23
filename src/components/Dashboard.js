import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5000';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [userData, setUserData] = useState(null); // For user-specific data
    const [adminData, setAdminData] = useState([]); // For admin-specific data
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
                    setAdminData(response.data); // Assuming this returns an array of users
                } else {
                    setUserData(response.data); // Assuming this returns user details
                }
                
            } catch (error) {
                alert('Error fetching data');
            }
        };

        fetchData();
    }, [role]);

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
                    <Link to="/apply-loan" className="btn btn-primary me-2">Apply for Loan</Link>
                    <Link to="/transfer-money" className="btn btn-primary me-2">Transfer Money</Link>
                    <Link to="/deposit-money" className="btn btn-primary me-2">Deposit Money</Link>
                    <Link to="/withdraw-money" className="btn btn-primary me-2">Withdraw Money</Link>
                    <Link to="/view-transactions" className="btn btn-primary me-2">View Transactions</Link>
                    <Link to="/repay-loan" className="btn btn-primary me-2">Repay Loan</Link>
                    <Link to="#calculate-emi" className="btn btn-primary me-2">Calculate the Loan EMI</Link>
                </div>
            )}

            {role === 'admin' && (
                <div className="mb-4">
                    <a href="#see-all-users" className="btn btn-primary me-2">See All Users</a>
                    <Link to="/manage-loans" className="btn btn-primary me-2">Manage Loans</Link>
                    <a href="#see-total-amount" className="btn btn-primary me-2">See Total Amount</a>
                    <a href="#see-number-loans" className="btn btn-primary me-2">See Number of Loans Going On</a>
                    <a href="#see-pending-loans" className="btn btn-primary me-2">See Pending Loans</a>
                    <a href="#see-approved-loans" className="btn btn-primary">See Approved Loans</a>
                </div>
            )}

            {role !== 'admin' && userData && (
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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminData.map(item => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.isActive ? 'Active' : 'Inactive'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Dashboard;
