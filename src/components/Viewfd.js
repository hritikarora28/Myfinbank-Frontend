import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const ViewAllFd = () => {
    const [fixedDeposits, setFixedDeposits] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFixedDeposits = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/transactions/all-fixed-deposits`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFixedDeposits(response.data);
            } catch (error) {
                setError('Error fetching fixed deposits');
                console.error(error);
            }
        };

        fetchFixedDeposits();
    }, []);

    return (
        <Container className="mt-4">
            <h2>All Fixed Deposits</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {fixedDeposits.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Principal Amount</th>
                            <th>Interest Rate</th>
                            <th>Start Date</th>
                            <th>Maturity Date</th>
                            <th>Maturity Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fixedDeposits.map((fd) => (
                            <tr key={fd._id}>
                                <td>{fd._id}</td>
                                <td>{fd.user.name}</td>
                                <td>{fd.principalAmount}</td>
                                <td>{fd.interestRate}%</td>
                                <td>{new Date(fd.startDate).toLocaleDateString()}</td>
                                <td>{new Date(fd.maturityDate).toLocaleDateString()}</td>
                                <td>{fd.maturityAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No fixed deposits found.</Alert>
            )}
        </Container>
    );
};

export default ViewAllFd;
