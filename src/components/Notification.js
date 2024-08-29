import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Fetch users with zero balance for admin
                const response = await axios.get(`${API_URL}/api/admins/users/zero-balance`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Process the response data to create notifications
                const zeroBalanceUsers = response.data.map(user => ({
                    message: `User ${user.name} (Email: ${user.email}) has a zero balance.`,
                    timestamp: new Date().toISOString(), // Current timestamp for display
                }));
                
                setNotifications(zeroBalanceUsers); // Set the notifications state
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Failed to fetch notifications. Please try again later.');
            }
        };

        fetchNotifications(); // Fetch notifications on component mount
    }, []);

    return (
        <div>
            <h3>Notifications</h3>
            {error && <p className="text-danger">{error}</p>}
            {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                    <div key={index} className="alert alert-info">
                        <p>{notification.message}</p>
                        <span>{new Date(notification.timestamp).toLocaleString()}</span>
                    </div>
                ))
            ) : (
                <p>No notifications available.</p>
            )}
        </div>
    );
};

export default Notification;
