import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const AdminViewTrasaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTransactions(response.data);
            } catch (error) {
                setError('Error fetching transactions');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Container className="mt-4">
            <h2>View Transactions</h2>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx._id}>
                            <td>{tx._id}</td>
                            <td>{tx.type}</td>
                            <td>{tx.amount}</td>
                            <td>{new Date(tx.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminViewTrasaction;