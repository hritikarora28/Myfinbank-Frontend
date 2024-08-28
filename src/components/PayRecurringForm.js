import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const PayRecurringForm = () => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(`${API_URL}/api/transactions/deposit-recurring`, {
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error paying for recurring deposit: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <Container className="mt-4">
            <h2>Pay for Recurring Deposit</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Pay
                </Button>
            </Form>
            {message && <Alert className="mt-3" variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
        </Container>
    );
};

export default PayRecurringForm;
