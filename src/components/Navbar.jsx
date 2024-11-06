import React, { useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ show }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const html = document.querySelector("html");
  html.addEventListener("click", () => setIsNavOpen(false));

  if (!show) return null;

  const handleLogout = () => {
    // Perform logout logic here
    navigate("/"); // Navigate to the login page after logging out
  };

  const handleSearch = () => {
    // Perform search logic
    console.log("Search term:", searchTerm);
  };

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
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={handleSearch}>Search</button>
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
  padding: 1rem 2rem; /* Increased padding for more space */
  position: relative;

  .brand {
    img {
      cursor: pointer;
      height: 50px;
      margin-left:-79px;
    }
  }

  .toggle {
    display: none; /* Only show this on mobile view */
  }

  .links {
    flex-grow: 1; /* Allow the links section to grow and fill space */
    ul {
      display: flex;
      justify-content: space-between;
      list-style-type: none;
      margin: 0 20px; /* Added margin for spacing */
      padding: 0;
      width: 100%;

      li {
        a {
          text-decoration: none;
          color: black;
          cursor: pointer;
          transition: var(--default-transition);
          padding: 0 10px; /* Added padding to create space around links */

          &:hover {
            color: var(--primary-color);
          }
        }
      }

      /* Specific margins for Home and Book Flights */
      .home {
        margin-left: 50px; /* Add left margin to Home */
      }
      .book-flights {
        margin-right: 50px; /* Add right margin to Book Flights */
      }
    }
  }

  .account-info {
    display: flex;
    align-items: center;
    gap: 1.5rem; /* Increased gap between items */
    margin-left: auto; /* Push account-info to the right */
    position: relative;

    .search-bar {
      display: flex;
      align-items: center;

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
      display: none; /* Hide account-info in mobile view */
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
      width: ${({ state }) => (state ? "60%" : "0%")};
      height: 100vh;
      background-color: var(--primary-color);
      opacity: 0;
      visibility: hidden;
      transition: 0.4s ease-in-out;

      ul {
        flex-direction: column;
        text-align: center;
        height: 100%;
        justify-content: center;

        li {
          a {
            color: white;
          }
        }
      }
    }
  }
`;
