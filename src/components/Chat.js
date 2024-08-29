import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Your backend server URL
const socket = io(SOCKET_SERVER_URL);

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [error, setError] = useState('');

  // Ensure we get the email from localStorage correctly
  const userEmail = localStorage.getItem('email') || ''; // Fetch from localStorage

  useEffect(() => {
    if (userEmail) {
      // Identify the user to the server immediately after connection
      socket.emit('identify', userEmail);
    } else {
      setError('User email is missing. Please log in again.');
    }

    const fetchMessages = async () => {
      try {
        if (!userEmail) {
          setError('User email is missing. Please log in again.');
          return;
        }
        const response = await axios.get(`${SOCKET_SERVER_URL}/api/chats/${userEmail}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat messages:', error);
        setError('Failed to fetch messages. Please try again later.');
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      console.log('Received message:', data); // Log to check received messages
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up the effect by disconnecting the socket when the component unmounts
    return () => {
      socket.off('receiveMessage'); // Correctly remove event listener
      socket.disconnect();
    };
  }, [userEmail]);

  const handleSendMessage = () => {
    if (!newMessage || !receiverEmail) {
      setError('Please enter a message and receiver email.');
      return;
    }

    if (!userEmail) {
      setError('Your email is missing. Please log in again.');
      return;
    }

    const messageData = {
      senderEmail: userEmail,
      receiverEmail,
      message: newMessage,
    };

    // Emit the message to the server
    socket.emit('sendMessage', messageData);

    // Optimistically update the UI
    setMessages((prevMessages) => [...prevMessages, { senderEmail: userEmail, receiverEmail, message: newMessage }]);

    setNewMessage('');
    setError('');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8} className="mx-auto">
          <h3 className="text-center mb-4">Chat</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="chat-box mb-4" style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.senderEmail === userEmail ? 'text-end' : 'text-start'}>
                <strong>{msg.senderEmail === userEmail ? 'You' : msg.senderEmail}:</strong> {msg.message}
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
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                placeholder="Receiver Email"
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
