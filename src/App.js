import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import './App.css';

// Lazy load components
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

function App() {
    return (
        <Router>
            <NavigationBar />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute
                                element={Dashboard}
                                allowedRoles={['admin']}
                            />
                        }
                    />
                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute
                                element={Dashboard}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
