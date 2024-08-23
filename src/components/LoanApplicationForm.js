// components/LoanApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const LoanApplicationForm = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTermMonths, setLoanTermMonths] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/loans/apply`, {
                loanAmount,
                interestRate,
                loanTermMonths
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error applying for loan: ' + error.response?.data?.error || error.message);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Apply for Loan</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLoanAmount">
                    <Form.Label>Loan Amount</Form.Label>
                    <Form.Control
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formInterestRate" className="mt-3">
                    <Form.Label>Interest Rate (%)</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLoanTermMonths" className="mt-3">
                    <Form.Label>Loan Term (Months)</Form.Label>
                    <Form.Control
                        type="number"
                        value={loanTermMonths}
                        onChange={(e) => setLoanTermMonths(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Submit
                </Button>
            </Form>
            {message && <Alert className="mt-3" variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
        </Container>
    );
};

export default LoanApplicationForm;
