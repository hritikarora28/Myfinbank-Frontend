import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
const API_URL = 'http://localhost:5000'
// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required'),
});

const RegistrationForm = () => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center">Register</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              role: 'user', // Default to 'user'
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Send data to the server
              axios.post(`${API_URL}/api/${values.role === 'admin' ? 'admins' : 'users'}/register`, values)
                .then(response => {
                  alert(response.data.message);
                })
                .catch(error => {
                  alert(error.response?.data?.error || 'Registration failed');
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <BootstrapForm.Group>
                  <BootstrapForm.Label>Name</BootstrapForm.Label>
                  <Field
                    name="name"
                    type="text"
                    as={BootstrapForm.Control}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.name}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <Field
                    name="email"
                    type="email"
                    as={BootstrapForm.Control}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.email}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                  <BootstrapForm.Label>Password</BootstrapForm.Label>
                  <Field
                    name="password"
                    type="password"
                    as={BootstrapForm.Control}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group>
                  <BootstrapForm.Label>Register as</BootstrapForm.Label>
                  <Field
                    name="role"
                    as="select"
                    className="form-control"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Field>
                </BootstrapForm.Group>

                <Button type="submit" disabled={isSubmitting} className="mt-3">
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
