describe('Chat Functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // Adjust URL if necessary
    });
  
    it('Allows a user to send and receive messages', () => {
      // Login as a user (implement login if needed)
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
  
      // Navigate to the chat page
      cy.contains('Chat').click();
  
      // Type a message and receiver email
      cy.get('input[placeholder="Type a message"]').type('Hello there!');
      cy.get('input[placeholder="Receiver Email"]').type('receiver@example.com');
      
      // Click the send button
      cy.contains('Send').click();
  
      // Check if the message appears in the chat
      cy.contains('You: Hello there!').should('exist');
    });
  });
  