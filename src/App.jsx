import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Destinations from "./components/Destinations";
import DownloadApp from "./components/DownloadApp";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Offer from "./components/Offer";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Tours from "./components/Tours"; 
import SignUp from "./components/SignUp"; 
import Forgot from "./components/Forgot"; 
import Login from "./components/Login"; 

const App = () => {
  const location = useLocation();

  // Determine if the current route is the login page
  const isLoginPage = location.pathname === "/";

  // Debugging: Log the current route
  console.log("Current Route:", location.pathname);

  // Create a ref for the Tours section
  const toursRef = useRef(null);

  // Function to scroll to the Tours section
  const scrollToTours = () => {
    if (toursRef.current) {
      toursRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <ScrollToTop />
      <Navbar show={!isLoginPage} /> {/* Pass prop to control Navbar visibility */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      {/* Components rendered under the Home route */}
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Services />
              <Destinations scrollToTours={scrollToTours} /> {/* Pass scrollToTours to Destinations */}
              <Offer />
              <Tours ref={toursRef} /> {/* Attach ref to the Tours section */}
              <Testimonial />
              <DownloadApp />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
};

// Wrap App in Router to provide routing context
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
