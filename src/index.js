import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import App from './App';
import LoginContainer from './Auth/LoginContainer';
import { usePromiseTracker } from 'react-promise-tracker';
import { TailSpin } from 'react-loader-spinner';
import MyStorage from "./utils/mystorage";
import { WebSocketProvider } from './hooks/WebSocketProvider';

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker();
  return promiseInProgress && (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.6)",
      position: "fixed",
      zIndex: "10002"
    }}>
      <TailSpin color="#ff0000" height={100} width={100} />
    </div>
  )
}

const PrivateRoute = ({ children }) => {
  const isLoggedIn = MyStorage.session.get('isLoggedIn') || false;
  return isLoggedIn ? children : <Navigate to="/login" />;
}
const PublicRoute = ({ children }) => {
  const isLoggedIn = MyStorage.session.get('isLoggedIn');
  return !isLoggedIn ? children : <Navigate to="/" />;
}

const routing = (
  <Router>
    <Routes>
      <Route path='/login' element={<PublicRoute><LoginContainer /></PublicRoute>} />
      <Route path='*' element={<PrivateRoute><App /></PrivateRoute>} />
    </Routes>
  </Router>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WebSocketProvider>
    <LoadingIndicator />
    {routing}
  </WebSocketProvider>
);