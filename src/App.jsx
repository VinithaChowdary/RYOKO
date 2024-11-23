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
import SearchResults from "./components/SearchResults"; // New component for search results

const App = () => {
  const location = useLocation();

  // Determine if the current route is login, sign-up, or forgot-password
  const isAuthPage = ["/", "/signup", "/forgot-password"].includes(location.pathname);

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
      {/* Render Navbar unless it's an auth page */}
      {!isAuthPage && <Navbar show={true} />} {/* Show navbar explicitly */}

      {/* Define routes */}
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<Forgot />} />

        {/* Home and related routes */}
        <Route
          path="/home"
          element={
            <>
              <Home />
              <Services />
              <Destinations scrollToTours={scrollToTours} />
              <Offer />
              <Tours ref={toursRef} />
              <Testimonial />
              <DownloadApp />
              <Footer />
            </>
          }
        />

        {/* Search Results Route */}
        <Route
          path="/search"
          element={
            <>
               {/* Ensure Navbar is shown for SearchResults page */}
              <SearchResults />
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
