import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import './App.css';

// Lazy load components
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const LoanApplicationForm = lazy(() => import('./components/LoanApplicationForm'));
const AdminLoanManagement = lazy(() => import('./components/AdminLoanManagement'));
const DepositMoney = lazy(() => import('./components/DepositMoney'));
const WithdrawMoney = lazy(() => import('./components/WithdrawMoney'));
const TransferMoney = lazy(() => import('./components/TransferMoney'));
const ViewTransactions = lazy(() => import('./components/ViewTransactions'));
const RepayLoan = lazy(() => import('./components/RepayLoan'));
const AdminViewTrasaction = lazy(()=> import('./components/AdminViewTrasaction'))
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
                    <Route
                        path="/apply-loan"
                        element={
                            <ProtectedRoute
                                element={LoanApplicationForm}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/manage-loans"
                        element={
                            <ProtectedRoute
                                element={AdminLoanManagement}
                                allowedRoles={['admin']}
                            />
                        }
                    />
                    <Route
                        path="/deposit-money"
                        element={
                            <ProtectedRoute
                                element={DepositMoney}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/withdraw-money"
                        element={
                            <ProtectedRoute
                                element={WithdrawMoney}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/transfer-money"
                        element={
                            <ProtectedRoute
                                element={TransferMoney}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/view-transactions"
                        element={
                            <ProtectedRoute
                                element={ViewTransactions}
                                allowedRoles={['user']}
                            />
                        }
                    />
                                        <Route
                        path="/all-transactions"
                        element={
                            <ProtectedRoute
                                element={AdminViewTrasaction}
                                allowedRoles={['admin']}
                            />
                        }
                    />
                    <Route
                        path="/repay-loan"
                        element={
                            <ProtectedRoute
                                element={RepayLoan}
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
