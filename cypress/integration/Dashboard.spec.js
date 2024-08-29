describe('Dashboard Functionality', () => {
    beforeEach(() => {
      // Set user or admin role in localStorage
      localStorage.setItem('role', 'admin'); // or 'user' for user testing
      cy.visit('http://localhost:3000'); // Adjust URL if necessary
    });
  
    it('Displays Admin Dashboard', () => {
      cy.contains('Admin Dashboard').should('exist');
      cy.contains('Manage and View Loans').should('exist');
    });
  
    it('Displays User Dashboard', () => {
      localStorage.setItem('role', 'user'); // Switch to user role
      cy.visit('http://localhost:3000');
  
      cy.contains('User Dashboard').should('exist');
      cy.contains('Apply for Loan').should('exist');
    });
  });
  