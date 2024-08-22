import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Row, Col } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const Dashboard = () => {
    const [data, setData] = useState({});
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
                setData(response.data);
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
                    <a href="#apply-loan" className="btn btn-primary me-2">Apply for Loan</a>
                    <a href="#transfer-money" className="btn btn-primary me-2">Transfer Money</a>
                    <a href="#calculate-emi" className="btn btn-primary">Calculate the Loan EMI</a>
                </div>
            )}

            {role === 'admin' && (
                <div className="mb-4">
                    <a href="#see-all-users" className="btn btn-primary me-2">See All Users</a>
                    <a href="#see-all-loans" className="btn btn-primary me-2">See All Loans</a>
                    <a href="#see-total-amount" className="btn btn-primary me-2">See Total Amount</a>
                    <a href="#see-number-loans" className="btn btn-primary me-2">See Number of Loans Going On</a>
                    <a href="#see-pending-loans" className="btn btn-primary me-2">See Pending Loans</a>
                    <a href="#see-approved-loans" className="btn btn-primary">See Approved Loans</a>
                </div>
            )}

            {role !== 'admin' && (
                <div className="mb-4">
                    <h4>User Details</h4>
                    <p><strong>Name:</strong> {data.name}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Balance:</strong> {data.balance}</p>
                </div>
            )}

            {role === 'admin' && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
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
