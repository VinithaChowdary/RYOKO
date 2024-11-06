import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { auth } from '../firbase'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import "../Styles/login.css"; 

function Forgot() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => navigate('/'), 5000); // Redirect to Login after 5 seconds
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="border p-4 shadow box"
        style={{ width: "300px", borderRadius: "8px" }}
      >
        <h3 className="text-center mb-4">Reset Password</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="email" // Apply the same styling class
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 sb">
            Send Password Reset Email
          </Button>

          {message && <div className="text-success mt-3">{message}</div>}
          {error && <div className="text-danger mt-3">{error}</div>}
        </Form>
      </div>
    </div>
  );
}

export default Forgot;
