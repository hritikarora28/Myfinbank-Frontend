import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const CreateFDForm = () => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(`${API_URL}/api/transactions/create-fd`, {
                principalAmount: parseFloat(amount),
                term: parseInt(term)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error creating fixed deposit: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <Container className="mt-4">
            <h2>Create Fixed Deposit</h2>
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
                <Form.Group controlId="formTerm" className="mt-3">
                    <Form.Label>Term (Months)</Form.Label>
                    <Form.Control
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Create Fixed Deposit
                </Button>
            </Form>
            {message && <Alert className="mt-3" variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
        </Container>
    );
};

export default CreateFDForm;
