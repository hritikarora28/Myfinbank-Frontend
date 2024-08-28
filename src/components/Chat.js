// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/chats/${userId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };

        fetchMessages();
    }, [userId]);

    const handleSendMessage = async () => {
        if (!newMessage) return;

        try {
            const receiverId = 'RECEIVER_ID'; // Replace with the actual receiver ID or logic to determine receiver
            await axios.post(`${API_URL}/api/chats/send`, {
                senderId: userId,
                receiverId,
                message: newMessage,
            });

            setMessages([...messages, { senderId: userId, receiverId, message: newMessage }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div>
            <h3>Chat</h3>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.senderId === userId ? 'You' : 'Other'}:</strong> {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};

export default Chat;
