import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notification from './Notification';

test('renders Notification component', () => {
  render(<Notification />);

  // Check if the Notification header is rendered
  const notificationHeader = screen.getByText(/Notifications/i);
  expect(notificationHeader).toBeInTheDocument();

  // Check if the "No notifications available" message is rendered
  const noNotificationsMessage = screen.getByText(/No notifications available/i);
  expect(noNotificationsMessage).toBeInTheDocument();
});
