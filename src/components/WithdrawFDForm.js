import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const WithdrawFDForm = () => {
    const [fdId, setFdId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post(`${API_URL}/api/transactions/withdraw-fd/${fdId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error withdrawing fixed deposit: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <Container className="mt-4">
            <h2>Withdraw Fixed Deposit</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFDId">
                    <Form.Label>Fixed Deposit ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={fdId}
                        onChange={(e) => setFdId(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                    Withdraw Fixed Deposit
                </Button>
            </Form>
            {message && <Alert className="mt-3" variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
        </Container>
    );
};

export default WithdrawFDForm;
