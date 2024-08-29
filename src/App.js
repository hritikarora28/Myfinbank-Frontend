import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer'; 
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
const AdminViewTrasaction = lazy(() => import('./components/AdminViewTrasaction'))
const StartRecurringForm = lazy(() => import('./components/StartRecurringForm'));
const PayRecurringForm = lazy(() => import('./components/PayRecurringForm'));
const ViewRecurringDeposits = lazy(() => import('./components/ViewRecurringDeposits'));
const AdminViewRecurringDeposits = lazy(() => import('./components/AdminViewRecurringDeposits'));
const CreateFDForm = lazy(() => import('./components/CreateFDForm'))
const WithdrawFDForm = lazy(() => import('./components/WithdrawFDForm'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const Chat = lazy(() => import('./components/Chat'));
const Notification = lazy(() => import('./components/Notification'));
const ViewAllFd = lazy(() => import('./components/ViewAllFd'));
const ViewFd = lazy(() => import('./components/Viewfd'));
const ViewUserLoans = lazy(() => import('./components/ViewUserLoans'));
const UpdateUser = lazy(() => import('./components/UpdateUser'));
function App() {
    return (
        <Router>
            <NavigationBar />
            <Suspense fallback={ <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>}>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/notifications" element={<Notification />} />
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
                    <Route
                        path="/start-recurring"
                        element={
                            <ProtectedRoute
                                element={StartRecurringForm}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/pay-recurring"
                        element={
                            <ProtectedRoute
                                element={PayRecurringForm}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/view-recurring"
                        element={
                            <ProtectedRoute
                                element={ViewRecurringDeposits}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/all-recurring-deposits"
                        element={
                            <ProtectedRoute
                                element={AdminViewRecurringDeposits}
                                allowedRoles={['admin']}
                            />
                        }
                    />
                    <Route
                        path="/create-fd"
                        element={
                            <ProtectedRoute
                                element={CreateFDForm}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/withdraw-fd"
                        element={
                            <ProtectedRoute
                                element={WithdrawFDForm}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/all-fd"
                        element={
                            <ProtectedRoute
                                element={ViewAllFd}
                                allowedRoles={['admin']}
                            />
                        }

                    />
                    <Route
                        path="/my-fd"
                        element={
                            <ProtectedRoute
                                element={ViewFd}
                                allowedRoles={['user']}
                            />
                        }

                    />

                    <Route
                        path="/view-loans"
                        element={
                            <ProtectedRoute
                                element={ViewUserLoans}
                                allowedRoles={['user']}
                            />
                        }
                    />
                    <Route
                        path="/update-user/:userId"
                        element={
                            <ProtectedRoute
                                element={UpdateUser}
                                allowedRoles={['admin']}
                            />
                        }
                    />



                    <Route path="/" element={<Login />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
}

export default App;
