import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dashboard from './Dashboard';

test('renders Dashboard component for Admin', () => {
  // Mock localStorage for admin role
  localStorage.setItem('role', 'admin');

  render(<Dashboard />);

  // Check if the Admin Dashboard header is present
  const dashboardHeader = screen.getByText(/Admin Dashboard/i);
  expect(dashboardHeader).toBeInTheDocument();

  // Check if specific admin links are present
  const manageLoansLink = screen.getByText(/Manage and View Loans/i);
  expect(manageLoansLink).toBeInTheDocument();
});

test('renders Dashboard component for User', () => {
  // Mock localStorage for user role
  localStorage.setItem('role', 'user');

  render(<Dashboard />);

  // Check if the User Dashboard header is present
  const dashboardHeader = screen.getByText(/User Dashboard/i);
  expect(dashboardHeader).toBeInTheDocument();

  // Check if specific user links are present
  const applyLoanLink = screen.getByText(/Apply for Loan/i);
  expect(applyLoanLink).toBeInTheDocument();
});
