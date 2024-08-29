import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Chat from './Chat';

// Mocking the socket.io-client module
jest.mock('socket.io-client', () => {
  return {
    connect: jest.fn(() => ({
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn()
    }))
  };
});

test('renders Chat component and allows sending a message', () => {
  render(<Chat />);

  // Check if the Chat header is rendered
  const chatHeader = screen.getByText(/Chat/i);
  expect(chatHeader).toBeInTheDocument();

  // Check if input fields are present
  const messageInput = screen.getByPlaceholderText(/Type a message/i);
  const receiverInput = screen.getByPlaceholderText(/Receiver Email/i);
  expect(messageInput).toBeInTheDocument();
  expect(receiverInput).toBeInTheDocument();

  // Simulate entering text into the input fields
  fireEvent.change(messageInput, { target: { value: 'Hello' } });
  fireEvent.change(receiverInput, { target: { value: 'test@example.com' } });

  // Simulate clicking the send button
  const sendButton = screen.getByText(/Send/i);
  fireEvent.click(sendButton);

  // Check if the input field is cleared after sending a message
  expect(messageInput.value).toBe('');
});
