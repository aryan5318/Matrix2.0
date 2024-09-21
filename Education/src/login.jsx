import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook to redirect

  useEffect(() => {
    // Ensure that labels move up if the inputs are pre-filled (autofill by browser)
    document.querySelectorAll('.input-field input').forEach(input => {
      if (input.value) {
        input.classList.add('filled'); // Add 'filled' class to move the label up
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token); // Save token in localStorage
      navigate('/app'); // Navigate to the main app
    } else {
      alert(data.msg || 'Invalid credentials');
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={email ? 'filled' : ''} // Add 'filled' class if value exists
          />
          <label>Enter your email</label>
        </div>

        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={password ? 'filled' : ''} // Add 'filled' class if value exists
          />
          <label>Enter your password</label>
        </div>

        <div className="forget">
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            <p>Remember me</p>
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Log In</button>

        <div className="register">
          <p><a href="/signup">Don't have an account? Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
