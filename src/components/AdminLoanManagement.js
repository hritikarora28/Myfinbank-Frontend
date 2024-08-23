// components/AdminLoanManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const AdminLoanManagement = () => {
    const [loans, setLoans] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/loans`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setLoans(response.data);
            } catch (error) {
                setMessage('Error fetching loans');
            }
        };

        fetchLoans();
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(`${API_URL}/api/loans/${id}/status`, { status: 'approved' }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Loan approved successfully');
            setLoans(loans.map(loan => loan._id === id ? { ...loan, status: 'approved' } : loan));
        } catch (error) {
            setMessage('Error approving loan');
        }
    };

    const handleDeny = async (id) => {
        try {
            await axios.put(`${API_URL}/api/loans/${id}/status`, { status: 'denied' }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage('Loan denied successfully');
            setLoans(loans.map(loan => loan._id === id ? { ...loan, status: 'denied' } : loan));
        } catch (error) {
            setMessage('Error denying loan');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Loan Management</h2>
            {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Loan Amount</th>
                        <th>Interest Rate</th>
                        <th>Term (Months)</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan => (
                        <tr key={loan._id}>
                            <td>{loan.loanAmount}</td>
                            <td>{loan.interestRate}</td>
                            <td>{loan.loanTermMonths}</td>
                            <td>{loan.status}</td>
                            <td>
                                {loan.status === 'pending' && (
                                    <>
                                        <Button variant="success" onClick={() => handleApprove(loan._id)} className="me-2">Approve</Button>
                                        <Button variant="danger" onClick={() => handleDeny(loan._id)}>Deny</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminLoanManagement;
