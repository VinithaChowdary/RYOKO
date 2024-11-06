import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firbase"; // Ensure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase function
import "../Styles/signup.css";

function SignUp() {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signUpError, setSignUpError] = useState(""); // State for sign up errors

  const validateEmail = (email) => {
    // Basic email regex for validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return false;
    }
    setPasswordError(""); // Clear error if passwords match
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpError(""); // Reset sign up error at the start

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else if (!validatePasswords()) {
      // If passwords don't match, return
      return;
    } else {
      setEmailError(""); // Clear errors if valid

      try {
        // Create a new user with email and password
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");
        // Navigate to login page with a success message in the state
        navigate("/", { state: { message: "Account added! Please login with your credentials." } });
      } catch (error) {
        // Handle sign up errors
        setSignUpError(error.message);
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="border p-4 shadow box"
        style={{ width: "300px", borderRadius: "8px" }}
      >
        <h3 className="text-center mb-4 signinhead">Join Us,</h3>
        <h5 className="signinh">Create an account</h5>
        {signUpError && <div className="text-danger">{signUpError}</div>} {/* Display signup error */}

        <Form onSubmit={handleSubmit}>
          {/* Email Field */}
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              isInvalid={!!emailError} // Show invalid state if there's an error
            />
            <Form.Control.Feedback type="invalid" className="invalid">
              {emailError} {/* Display the error message */}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId="formBasicPassword" className="mb-3 pp">
            <Form.Control
              type="password"
              placeholder="Password"
              className="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value); // Update password state on change
                setPasswordError(""); // Reset password error when typing
              }}
              isInvalid={!!passwordError} // Highlight if there is a password mismatch
            />
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group controlId="formConfirmPassword" className="mb-3 cp">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              className="password" // Use the same class as Password field
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value); // Update confirm password state on change
                if (password === e.target.value) {
                  setPasswordError(""); // Reset error if passwords match
                } else {
                  setPasswordError("Passwords do not match.");
                }
              }}
              isInvalid={!!passwordError} // Show invalid state if passwords don't match
            />
            <Form.Control.Feedback type="invalid" className="invalid">
              {passwordError} {/* Display the password mismatch error */}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Sign Up Button */}
          <Button variant="primary" type="submit" className="w-100 mb-3 sb">
            Sign Up
          </Button>
        </Form>
      </div>

      {/* Already have an account? */}
      <div className="join text-center mt-3 joinnow">
        <small>
          Already have an account?{" "}
          <Link to="/" className="text-decoration-none">
            Sign in here
          </Link>
        </small>
      </div>
    </div>
  );
}

export default SignUp;
