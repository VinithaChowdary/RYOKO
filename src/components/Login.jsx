import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firbase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "../Styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();

  // Declare the image URL as a variable
  const backgroundImageUrl = "login.png"; // Make sure this is in your public folder

  useEffect(() => {
    if (location.state && location.state.message) {
      setSignupMessage(location.state.message);
    }
  }, [location.state]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully");
        navigate("/home");
      } catch (error) {
        console.error("Error logging in:", error);
        setEmailError("Invalid email or password.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User logged in with Google");
      navigate("/home");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

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
          <h3 className="text-center mb-4 signinhead">Welcome Again,</h3>
          <h5 className="signinh">Sign in to continue</h5>

          {signupMessage && <div className="text-success">{signupMessage}</div>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Email"
                className="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid" className="invalid">
                {emailError}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="text-end mb-3 forgot1">
              <Link to="/forgot-password" className="text-decoration-none forgot">
                Forgot password?
              </Link>
            </div>

            <Button variant="primary" type="submit" className="w-100 mb-3 sb">
              Sign in
            </Button>

            <div className="text-center mb-3 divider-container">
              <hr className="divider" />
              <span className="divider-text">or</span>
              <hr className="divider" />
            </div>

            <Button
              variant="dark"
              type="button"
              className="w-100 mt-3 google"
              onClick={handleGoogleSignIn}
            >
              <i className="fab fa-google me-2"></i> Sign in with Google
            </Button>
          </Form>

          <div className="join text-center mt-3 joinnow">
            <small>
              New to Ryoko?{" "}
              <Link to="/SignUp" className="text-decoration-none join">
                Join now
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
