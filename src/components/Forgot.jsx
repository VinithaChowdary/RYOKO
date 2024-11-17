import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { auth } from "../firbase"; // Corrected import path
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (isPhone) {
      // Reset via phone number
      try {
        // Ensure reCAPTCHA is initialized
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container", // container for reCAPTCHA
            {
              size: "invisible", // Invisible reCAPTCHA
              callback: (response) => {
                console.log("Captcha resolved:", response);
              },
              "expired-callback": () => {
                console.log("Captcha expired");
              },
            },
            auth
          );
        }

        const appVerifier = window.recaptchaVerifier;

        // Send SMS with verification code
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        setMessage("Verification code sent to your phone!");

        // Prompt user to enter verification code
        const verificationCode = prompt(
          "Enter the verification code sent to your phone:"
        );

        if (verificationCode) {
          // Confirm the code entered by the user
          const result = await confirmationResult.confirm(verificationCode);
          const user = result.user;

          // Now prompt the user to enter a new password
          const newPassword = prompt("Enter your new password:");
          if (newPassword) {
            await updatePassword(user, newPassword);
            setMessage("Password reset successful!");
            setTimeout(() => navigate("/"), 5000); // Redirect to Login after 5 seconds
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
        setTimeout(() => navigate("/"), 5000); // Redirect to Login after 5 seconds
      } catch (error) {
        console.error("Error sending password reset email:", error);
        setError(`Failed to send password reset email: ${error.message}`);
      }
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div
        className="border p-4 shadow box"
        style={{ width: "300px", borderRadius: "8px" }}
      >
        <h3 className="text-center mb-4 res">Reset Password</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmailOrPhone" className="mb-3">
            <Form.Control
              type={isPhone ? "tel" : "email"}
              placeholder={
                isPhone ? "Enter your phone number" : "Enter your email"
              }
              value={isPhone ? phoneNumber : email}
              onChange={(e) =>
                isPhone
                  ? setPhoneNumber(e.target.value)
                  : setEmail(e.target.value)
              }
              required
              className="email"
            />
          </Form.Group>
          {isPhone && <div id="recaptcha-container"></div>}{" "}
          {/* reCAPTCHA container */}

          <Button
            variant="primary"
            className="w-100 sb mt-3 sec"
            type="submit"
          >
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
  );
}

export default Forgot;
