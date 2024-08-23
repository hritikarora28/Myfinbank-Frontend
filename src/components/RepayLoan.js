import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const RepayLoan = () => {
    const [loanId, setLoanId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleRepayment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${API_URL}/api/transactions/repay-loan`,
                { loanId, amount },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'Error making repayment');
        }
    };

    return (
        <Container>
            <h2>Repay Loan</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleRepayment}>
                <Form.Group controlId="loanId">
                    <Form.Label>Loan ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Loan ID"
                        value={loanId}
                        onChange={(e) => setLoanId(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter amount to repay"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Repay Loan
                </Button>
            </Form>
        </Container>
    );
};

export default RepayLoan;
