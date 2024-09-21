import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure labels move up if inputs are pre-filled
    document.querySelectorAll('.input-field input').forEach(input => {
      if (input.value) {
        input.classList.add('filled');
      }
    });
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token); // Save token after signup
      navigate('/app'); // Navigate to the main app
    } else {
      alert(data.errors ? data.errors[0].msg : data.msg);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSignup}>
        <h2>Signup</h2>

        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={email ? 'filled' : ''}
          />
          <label>Enter your email</label>
        </div>

        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={password ? 'filled' : ''}
          />
          <label>Enter your password</label>
        </div>

        <button type="submit">Signup</button>

        <div className="register">
          <p><a href="/login">Don't have an account? Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
