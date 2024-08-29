import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-dark mt-5 p-4 text-center">
      <Container>
        <Row>
          <Col md="15">
            <p className="mb-0">&copy; {new Date().getFullYear()} MyFinBank. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
