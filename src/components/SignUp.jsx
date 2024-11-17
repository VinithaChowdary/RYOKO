import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firbase"; // Ensure this path is correct
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase function
import "../Styles/signup.css";

function SignUp() {
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState(""); // State for name
  const [phone, setPhone] = useState(""); // State for phone number
  const [email, setEmail] = useState(""); // State for email
  const [emailError, setEmailError] = useState(""); // State for email validation errors
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [passwordError, setPasswordError] = useState(""); // State for password mismatch error
  const [signUpError, setSignUpError] = useState(""); // State for general signup error

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
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
    e.preventDefault(); // Prevent page reload on form submit
    setSignUpError(""); // Reset any previous signup errors

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else if (!validatePasswords()) {
      return;
    } else {
      setEmailError(""); // Clear any previous email errors

      try {
        // Create a new user with email and password in Firebase
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully");

        // Send user data (name, phone, email) to the backend to store in the database
        const response = await fetch("http://localhost:5001/signup", {
          method: "POST", // POST request to the backend
          headers: {
            "Content-Type": "application/json", // Ensure the server understands the data format
          },
          body: JSON.stringify({
            name,    // Sending name to the backend
            phone,   // Sending phone number to the backend
            email,   // Sending email to the backend
          }),
        });

        const data = await response.json(); // Get the response from the backend
        if (response.ok) {
          console.log("User data saved to database:", data.message);
          // Navigate to login page with success message
          navigate("/", { state: { message: "Account added! Please login with your credentials." } });
        } else {
          throw new Error(data.error); // If there's an error, throw it
        }
      } catch (error) {
        // Handle any errors that happen during signup
        setSignUpError(error.message);
        console.error("Error signing up:", error);
      }
    }
  };

  const backgroundImageUrl = "login.png"; // Background image URL

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,  // Path to your image
        backgroundSize: "cover",  // Ensure the image covers the whole page
        backgroundPosition: "center",  // Center the image
        height: "100vh",  // Ensure it takes up the full viewport height
        width: "100vw",  // Ensure it takes up the full viewport width
        margin: 0,  // Remove default margin
        padding: 0,  // Remove default padding
        position: "absolute",  // Position it absolutely to fill the screen
        top: 0,
        left: 0,
      }}
    >
      {/* Overlay to adjust opacity */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",  // Apply a semi-transparent overlay
        }}
      ></div>

      {/* Content Container */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
      >
        {/* Form Container */}
        <div
          className="border p-4 shadow box"
          style={{
            width: "350px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",  // Make form container slightly transparent
          }}
        >
          <h3 className="text-center mb-4 signinhead">Join Us,</h3>
          <h5 className="signinh">Create an account</h5>
          {signUpError && <div className="text-danger">{signUpError}</div>} {/* Display signup error */}

          <Form onSubmit={handleSubmit}>
            {/* Name Field */}
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                className="email"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
              />
            </Form.Group>

            {/* Phone Number Field */}
            <Form.Group controlId="formBasicPhone" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                className="email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Update phone state
              />
            </Form.Group>

            {/* Email Field */}
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid" className="invalid">
                {emailError} {/* Display error message */}
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
                  setPassword(e.target.value); // Update password state
                  setPasswordError(""); // Reset password error
                }}
                isInvalid={!!passwordError} // Highlight if password mismatch
              />
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group controlId="formConfirmPassword" className="mb-3 cp">
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value); // Update confirm password state
                  if (password === e.target.value) {
                    setPasswordError(""); // Reset error if passwords match
                  } else {
                    setPasswordError("Passwords do not match.");
                  }
                }}
                isInvalid={!!passwordError} // Show invalid state if passwords don't match
              />
              <Form.Control.Feedback type="invalid" className="invalid">
                {passwordError} {/* Display password mismatch error */}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Sign Up Button */}
            <Button variant="primary" type="submit" className="w-100 mb-3 sb">
              Sign Up
            </Button>

            {/* Already have an account? */}
            <div className="join text-center mt-3 joinnow">
              <small>
                Already have an account?{" "}
                <Link to="/" className="text-decoration-none">
                  Sign in here
                </Link>
              </small>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
