import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firbase";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Styles/fogot.css";

function Forgot() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const navigate = useNavigate();

  // Initialize reCAPTCHA
  useEffect(() => {
    if (isPhone && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container", // This ID should match your HTML element
          {
            size: "invisible",
            callback: (response) => {
              console.log("Captcha resolved:", response);
            },
            "expired-callback": () => {
              console.log("Captcha expired");
            },
          },
          auth
        );
        console.log("reCAPTCHA initialized successfully");
      } catch (error) {
        console.error("Error initializing reCAPTCHA:", error);
        setError("Failed to initialize reCAPTCHA.");
      }
    }
  }, [isPhone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (isPhone) {
      // Reset via phone number
      try {
        const appVerifier = window.recaptchaVerifier;

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        setMessage("Verification code sent to your phone!");

        const verificationCode = prompt(
          "Enter the verification code sent to your phone:"
        );

        if (verificationCode) {
          const result = await confirmationResult.confirm(verificationCode);
          const user = result.user;

          const newPassword = prompt("Enter your new password:");
          if (newPassword) {
            await updatePassword(user, newPassword);
            setMessage("Password reset successful!");
            setTimeout(() => navigate("/"), 5000);
          } else {
            setError("Password cannot be empty.");
          }
        } else {
          setError("Verification code was not entered.");
        }
      } catch (error) {
        console.error("Error resetting password via phone number:", error);
        setError(`Failed to reset password via phone number: ${error.message}`);
      }
    } else {
      // Reset via email
      try {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset email sent! Check your inbox.");
        setTimeout(() => navigate("/"), 5000);
      } catch (error) {
        console.error("Error sending password reset email:", error);
        setError(`Failed to send password reset email: ${error.message}`);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('login.png')`,  // Path to your image
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
          <h3 className="text-center mb-4 res">Reset Password</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmailOrPhone" className="mb-3">
              <Form.Control
                type={isPhone ? "tel" : "email"}
                placeholder={isPhone ? "Enter your phone number" : "Enter your email"}
                value={isPhone ? phoneNumber : email}
                onChange={(e) =>
                  isPhone ? setPhoneNumber(e.target.value) : setEmail(e.target.value)
                }
                required
                className="email"
              />
            </Form.Group>
            {isPhone && <div id="recaptcha-container"></div>}{" "}
            {/* reCAPTCHA container */}

            <Button variant="primary" className="w-100 sb mt-3 sec" type="submit">
              {isPhone ? "Reset via Phone" : "Reset via Email"}
            </Button>

            <div className="text-center mt-3">
              <a
                href="#"
                className="custom-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPhone(!isPhone);
                }}
              >
                {isPhone ? "Reset via Email?" : "Reset via Phone Number?"}
              </a>
            </div>

            {message && <div className="text-success mt-3">{message}</div>}
            {error && <div className="text-danger mt-3">{error}</div>}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
