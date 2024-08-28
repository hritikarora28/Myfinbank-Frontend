import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const ViewUserLoans = () => {
    const [loans, setLoans] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/transactions/my-loans`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setLoans(response.data);
            } catch (error) {
                setError('Error fetching loans');
                console.error(error);
            }
        };

        fetchLoans();
    }, []);

    return (
        <Container className="mt-4">
            <h2>My Loans</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loans.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loan Amount</th>
                            <th>Interest Rate</th>
                            <th>Start Date</th>
                            <th>Maturity Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map((loan) => (
                            <tr key={loan._id}>
                                <td>{loan._id}</td>
                                <td>{loan.loanAmount}</td>
                                <td>{loan.interestRate}%</td>
                                <td>{new Date(loan.startDate).toLocaleDateString()}</td>
                                <td>{new Date(loan.maturityDate).toLocaleDateString()}</td>
                                <td>{loan.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <Alert variant="info">No loans found.</Alert>
            )}
        </Container>
    );
};

export default ViewUserLoans;
