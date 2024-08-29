import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = localStorage.getItem('userId');
    const [receiverId, setReceiverId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/chats/${userId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
                setError('Failed to fetch messages. Please try again later.');
            }
        };

        fetchMessages();
    }, [userId]);

    const handleSendMessage = async () => {
        if (!newMessage || !receiverId) {
            setError('Please enter a message and receiver ID.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/chats/send`, {
                senderId: userId,
                receiverId,
                message: newMessage,
            });

            setMessages([...messages, response.data]);
            setNewMessage('');
            setError('');
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send the message. Please try again later.');
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8} className="mx-auto">
                    <h3 className="text-center mb-4">Chat</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="chat-box mb-4" style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.senderId._id === userId ? 'text-end' : 'text-start'}>
                                <strong>{msg.senderId._id === userId ? 'You' : msg.senderId.name}:</strong> {msg.message}
                            </div>
                        ))}
                    </div>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                value={receiverId}
                                onChange={(e) => setReceiverId(e.target.value)}
                                placeholder="Receiver ID"
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSendMessage} className="w-100">
                            Send
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
