import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import StoresList from './components/StoresList';
import UsersList from './components/UsersList';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, role: payload.role, email: payload.email, token });
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getRedirectPath = () => {
  if (!user) return "/login";
  if (user.role === "store_owner" || user.role === "user") return "/stores";
  return "/dashboard";
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Navbar user={user} logout={logout} />}
        
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup setUser={setUser} /> : <Navigate to="/dashboard" />} 
          />
          
          <Route 
            path="/dashboard" 
            element={
              !user ? (
                <Navigate to="/login" />
              ) : user.role !== 'admin' ? (
                <Navigate to="/stores" />
              ) : (
                <AdminDashboard user={user} />
              )
            }
          />
          <Route 
            path="/stores" 
            element={user ? <StoresList user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/users" 
            element={user && user.role === 'admin' ? <UsersList user={user} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/profile" 
            element={user ? <Profile user={user} /> : <Navigate to="/login" />} 
          />
          
          <Route path="/" element={<Navigate to={getRedirectPath()} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
