import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import DataScientistDashboard from './components/Dashboard/DataScientistDashboard';
import ChiefDashboard from './components/Dashboard/ChiefDashboard';
import Navbar from './components/Navbar';
import DecisionList from './components/DecisionList';
import DecisionDetail from './components/DecisionDetail';
import { DecisionProvider } from './context/DecisionContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <DecisionProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto py-8 px-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/data-scientist"
                element={
                  <PrivateRoute allowedRoles={['data_scientist']}>
                    <DataScientistDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/chief"
                element={
                  <PrivateRoute allowedRoles={['chief_data_scientist']}>
                    <ChiefDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/decision/:id" element={<DecisionDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DecisionProvider>
  );
}

export default App;