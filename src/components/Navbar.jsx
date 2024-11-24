import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation to track current route
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar({ show }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // Toggle profile visibility
  const [user, setUser] = useState(null); // Store use

  const navigate = useNavigate();
  const location = useLocation(); // Use location to track current page

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5001/lastUser") // Endpoint to serve the file
      .then((response) => {
        setUser(response.data); // Use the fetched data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  

  useEffect(() => {
    axios
      .get("http://localhost:5001/place")
      .then((response) => {
        setPlaces(response.data.places);
        setLoading(false); // Ensure this line is present
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoading(false); // Ensure this line is present
      });
  }, []);

  // Clear searchTerm after navigating to the search page
  useEffect(() => {
    if (location.pathname.includes("/search")) {
      setSearchTerm(""); // Clear the searchTerm when on search page
    }
  }, [location]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = () => {
    navigate(`/search?term=${searchTerm}`);
    setSearchTerm(""); // Clear search bar after search
  };

  // This is your existing handlePlaceClick function in Navbar.jsx

  const handlePlaceClick = async (placeName) => {
    try {
      setSearchTerm(placeName);
      setShowDropdown(false);

    const toggleProfile = () => {
      setShowProfile((prev) => !prev); // Toggle the profile dropdown visibility
    };

    // Send selected place to the backend
    const response = await axios.post("http://localhost:5001/getHotels", { place: placeName });

      // Redirect to the search page with fetched hotels
      navigate("/search", { state: { hotels: response.data.hotels } });
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setShowDropdown(false), 100);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container state={isNavOpen ? 1 : 0}>
      <div className="brand">
        <img src={Logo} alt="logo" />
      </div>
      <div className="toggle">
        {isNavOpen ? (
          <MdClose onClick={() => setIsNavOpen(false)} />
        ) : (
          <GiHamburgerMenu
            onClick={(e) => {
              e.stopPropagation();
              setIsNavOpen(true);
            }}
          />
        )}
      </div>
      <div className={`links ${isNavOpen ? "show" : ""}`}>
        <ul>
          <li className="home">
            <a href="#services">Home</a>
          </li>
          <li>
            <a href="#destination">Destination</a>
          </li>
          <li>
            <a href="#offer">Offer</a>
          </li>
          <li>
            <a href="#tour">Tour</a>
          </li>
          <li>
            <a href="#blog">AI Destination Planner</a>
          </li>
          <li>
            <a href="#hotels">Hotels and Stays</a>
          </li>
          <li className="book-flights">
            <a href="#flights">Book Flights</a>
          </li>
        </ul>
      </div>

      <div className="account-info">
        <div className="search-bar" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder="Search..."
          />
          <button onClick={handleSearch}>Search</button>
          {showDropdown && places && places.length > 0 && (
            <ul className="dropdown">
              {places
                .filter((place) =>
                  place.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .sort()
                .map((place, index) => (
                  <li key={index} onClick={() => handlePlaceClick(place)}>
                    {place}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: relative;

  .brand {
    img {
      cursor: pointer;
      height: 50px;
      margin-left: -79px;
    }
  }

  .toggle {
    display: none;
  }

  .links {
    width: ${({ $state }) => ($state ? "70%" : "0")};
    flex-grow: 1;
    ul {
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      margin: 0 20px;
      padding: 0;
      width: 100%;

      li {
        a {
          text-decoration: none;
          color: black;
          cursor: pointer;
          transition: var(--default-transition);
          padding: 0 10px;

          &:hover {
            color: var(--primary-color);
          }
        }
      }

      .home {
        margin-left: 50px;
      }
      .book-flights {
        margin-right: 50px;
      }
    }
  }

  .account-info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-left: auto;
    position: relative;

    .search-bar {
      display: flex;
      align-items: center;
      position: relative;

      input {
        border: 1px solid #ccc;
        padding: 0.5rem;
        width: 200px;
        margin-right: 0.5rem;
      }

      button {
        background-color: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: var(--default-transition);

        &:hover {
          background-color: darkred;
        }
      }

      .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        border: 1px solid #ccc;
        list-style: none;
        max-height: 200px;
        overflow-y: auto;
        padding: 0;
        margin-top: 5px;
        z-index: 1000;

        li {
          padding: 0.5rem;
          cursor: pointer;
          transition: background-color 0.3s;

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }

    .logout-btn {
      background-color: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
      transition: var(--default-transition);
      margin-right: -90px;

      &:hover {
        background-color: darkred;
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .account-info {
      display: none;
    }

    .brand {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
    }

    .toggle {
      padding-right: 1rem;
      display: block;
      z-index: 1;
    }

    .show {
      opacity: 1 !important;
      visibility: visible !important;
    }

    .links {
      position: absolute;
      overflow-x: hidden;
      top: 0;
      right: 0;
      width: ${({ state }) => (state ? "70%" : "0")};
      height: 100vh;
      background-color: #fff;
      padding-top: 3rem;
      z-index: 999;
      transition: all 0.3s ease;
    }

    .links ul {
      flex-direction: column;
      gap: 2rem;
    }
  }
`;
