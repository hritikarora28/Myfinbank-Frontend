import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const API_URL = 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'user', // default to user login
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const endpoint = values.role === 'admin' ? `${API_URL}/api/admins/login` : `${API_URL}/api/users/login`;
        const response = await axios.post(endpoint, values);
        const { token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', values.role);
        localStorage.setItem('email', values.email);


        navigate(values.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
      } catch (error) {
        console.error('Login error', error);
        alert('Invalid credentials');
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...formik.getFieldProps('email')}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...formik.getFieldProps('password')}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="User"
                  name="role"
                  value="user"
                  checked={formik.values.role === 'user'}
                  onChange={() => formik.setFieldValue('role', 'user')}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Admin"
                  name="role"
                  value="admin"
                  checked={formik.values.role === 'admin'}
                  onChange={() => formik.setFieldValue('role', 'admin')}
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
