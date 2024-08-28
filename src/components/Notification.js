// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/emails/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId]);

    return (
        <div>
            <h3>Notifications</h3>
            {notifications.map((notification, index) => (
                <div key={index}>
                    <p>{notification.message}</p>
                    
                    <span>{new Date(notification.sentAt).toLocaleString()}</span>
                </div>
            ))}
            <p>Joe doe has zero balance in account</p>
        </div>
    );
};

export default Notification;
