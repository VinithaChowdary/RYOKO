import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firbase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "../Styles/login.css";
import HCaptcha from "@hcaptcha/react-hcaptcha"; // Import hCaptcha


function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null); // State for captcha token
  const captchaRef = useRef(null); // Ref for captcha component
  const location = useLocation();
  const [signupMessage, setSignupMessage] = useState("");
  const navigate = useNavigate();

  // Access the CAPTCHA site key from the environment variable
  const CAPTCHA_SITE_KEY = import.meta.env.VITE_CAPTCHA_SITE_KEY;

  console.log("CAPTCHA_SITE_KEY:", CAPTCHA_SITE_KEY);

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

    if (!captchaToken) {
      setEmailError("Please complete the CAPTCHA verification.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
      try {
        // Your authentication logic
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully");
        navigate("/home");
      } catch (error) {
        console.error("Error logging in:", error);
        setEmailError("Invalid email or password.");
      } finally {
        // Reset captcha after login attempt
        if (captchaRef.current) captchaRef.current.resetCaptcha();
      }
    }
  };

  const handleGoogleSignIn = async () => {
    if (!captchaToken) {
      setEmailError("Please complete the CAPTCHA verification.");
      return;
    }
  
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("User logged in with Google");
      navigate("/home");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setEmailError("Google Sign-In failed. Please try again.");
    } finally {
      // Reset captcha after the sign-in attempt
      if (captchaRef.current) captchaRef.current.resetCaptcha();
      setCaptchaToken(null); // Clear the CAPTCHA token
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      ></div>

      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}
      >
        <div
          className="border p-4 shadow box"
          style={{
            width: "350px",
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
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

            <HCaptcha
              ref={captchaRef}
              sitekey={CAPTCHA_SITE_KEY} // Use environment variable
              onVerify={(token) => {
                setCaptchaToken(token);
              }}
            />

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
