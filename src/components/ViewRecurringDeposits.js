import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const ViewRecurringDeposits = () => {
    const [recurringDeposits, setRecurringDeposits] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchRecurringDeposits = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/transactions/my-recurring-deposits`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRecurringDeposits(response.data);
            } catch (error) {
                setMessage('Error fetching recurring deposits: ' + (error.response?.data?.error || error.message));
            }
        };

        fetchRecurringDeposits();
    }, []);

    return (
        <Container className="mt-4">
            <h2>Your Recurring Deposits</h2>
            {message && <Alert variant="danger">{message}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Recuuring Id</th>
                        <th>Amount</th>
                        <th>Term (Months)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recurringDeposits.map((deposit) => (
                        <tr key={deposit._id}>
                            <td>{deposit._id}</td>
                            <td>{deposit.amount}</td>
                            <td>{deposit.term}</td>
                            <td>Ongoing</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ViewRecurringDeposits;
