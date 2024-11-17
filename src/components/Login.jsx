import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firbase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import "../Styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState(null); // Store the reCAPTCHA response
  const location = useLocation();
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();

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

    // Check for reCAPTCHA validation
    if (!recaptchaValue) {
      setEmailError("Please complete the CAPTCHA.");
      return;
    }

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

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Set the value of reCAPTCHA
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="border p-4 shadow box" style={{ width: "350px", borderRadius: "8px" }}>
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

          {/* reCAPTCHA Widget */}
          <div className="mb-3">
            <ReCAPTCHA
              sitekey="6LfgvIAqAAAAAIj63e0x6325HNuTF7EQKXcC3EM5" // Replace with your actual site key
              onChange={handleRecaptchaChange}
            />
          </div>

          <Button variant="primary" type="submit" className="w-100 mb-3 sb">
            Sign in
          </Button>

          <div className="text-center mb-3 divider-container">
            <hr className="divider" />
            <span className="divider-text">or</span>
            <hr className="divider" />
          </div>

          <Button variant="dark" type="button" className="w-100 mt-3 google" onClick={handleGoogleSignIn}>
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
  );
}

export default Login;
