import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login.jsx';
import Signup from './signup.jsx';
import App from './App.jsx'; // The component with your main app content
import CourseDetails from './CourseDetails.jsx';
const Index = () => {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Protected route for the main app */}
        <Route
          path="/app"
          element={
            isAuthenticated ? <App /> : <Navigate to="/login" />
          }
        />
          {/* Dynamic Route for Course Details */}
          <Route
          path="/courses/:courseId"
          element={isAuthenticated ? <CourseDetails /> : <Navigate to="/login" />}
        />
        {/* Redirect to login if trying to access root */}
        <Route path="/" element={<Navigate to={isAuthenticated ? '/app' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default Index;
