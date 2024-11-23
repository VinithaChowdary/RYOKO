// home.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";
import HeroImage from "../assets/hero.png";
import Button from "./Button";
import Navbar from "./Navbar"; // Import Navbar component
import axios from "axios"; // Import axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [priceRange, setPriceRange] = useState([100, 10000]); // Adjusted price range
  const [places, setPlaces] = useState([]); // State to store place names
  const [selectedPlace, setSelectedPlace] = useState(""); // State for selected destination

  const navigate = useNavigate(); // Instantiate useNavigate hook

  // Fetch place names when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5001/place")
      .then((response) => {
        // Use a Set to remove duplicates
        const uniquePlaces = [
          ...new Set(response.data.places.map((place) => place.place_name)),
        ];
        setPlaces(uniquePlaces);
        console.log("Unique Places fetched:", uniquePlaces);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  // Handler to update price range when slider is moved
  const handleSliderChange = (newValue) => {
    console.log("Slider changed:", newValue);
    setPriceRange(newValue);
  };

  // Handler for the Discover More button click
  const handleDiscoverMore = (e) => {
    e.preventDefault();
    console.log("Selected place:", selectedPlace);
    console.log("Price range:", priceRange);

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (selectedPlace) {
      queryParams.append('destination', selectedPlace);
    }
    if (priceRange.length === 2) {
      queryParams.append('priceMin', priceRange[0]);
      queryParams.append('priceMax', priceRange[1]);
    }

    // Navigate to discover page with query parameters
    navigate(`/discover?${queryParams.toString()}`);
  };

  return (
    <Section>
      
      <div className="background">
        <img src={HeroImage} alt="Hero" />
      </div>
      <div className="content">
        <div className="info">
          <h1>It's Time To</h1>
          <h1>Explore The World</h1>
          <Button text="Plan Your Trip" />
        </div>
        <div className="planner">
          <form>
            <div className="row">
              <label>Destinations</label>
              <select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                <option value="" disabled>
                  Select a Destination
                </option>
                {places.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <label>Start Date</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="row">
              <label>End Date</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="row">
              <label>Price Range</label>
              <input
                type="text"
                value={`$${priceRange[0]} - $${priceRange[1]}`}
                readOnly
              />
            </div>
            <div className="row">
              <label>Adjust Price Range</label>
              <SliderContainer>
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="example-thumb"
                  trackClassName="example-track"
                  min={100} // Adjusted min to match database
                  max={10000}
                  step={100}
                  value={priceRange}
                  onChange={handleSliderChange}
                  pearling
                  minDistance={100} // Adjusted minDistance
                />
              </SliderContainer>
            </div>
            <div className="row">
              <Button text="Discover More" onClick={handleDiscoverMore} />
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin-top: 2rem;
  position: relative;

  .background {
    img {
      height: 90vh;
      width: 100%;
      object-fit: cover; /* Ensures the image covers the container without distortion */
    }
  }

  .content {
    .info {
      position: absolute;
      top: 5rem;
      margin-left: 8rem;

      h1 {
        font-size: 5rem;
        margin-bottom: 2rem;
      }
    }

    .planner {
      position: absolute;
      bottom: -2rem;
      right: 0;
      background-color: white;
      padding: 2rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      form {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3rem;

        .row {
          display: flex;
          flex-direction: column;
          text-align: start;

          label {
            font-size: 0.7rem;
            color: var(--secondary-text);
          }

          input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            filter: invert(58%) sepia(69%) saturate(2588%) hue-rotate(325deg)
              brightness(105%) contrast(101%);
          }

          input:focus {
            outline: none;
          }

          input,
          select {
            border: none;
            width: 100%;
            color: var(--primary-color);
            margin-top: 0.5rem;
            background-color: white;
            font-size: 1.1rem;
            border-bottom: 1px solid #f5ebe9;
            padding-bottom: 0.3rem;
          }
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .background {
      img {
        height: 50vh;
      }
    }

    .content {
      .info {
        margin-left: 2rem;

        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
      }

      .planner {
        position: initial;
        margin: 2rem;

        form {
          align-items: flex-start;
          flex-direction: column;
        }
      }
    }
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex; /* Add flexbox for alignment */
  justify-content: center; /* Center align horizontally */
  align-items: center; /* Center align vertically */

  .horizontal-slider {
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: #f0f0f0; /* Add a light gray background for the slider line */
    position: relative; /* Allow positioning of the thumbs relative to the track */
  }

  .example-thumb {
    height: 20px;
    width: 20px;
    background-color: #ff715b;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: 50%; /* Center the thumb vertically */
    transform: translateY(-50%); /* Adjust for the height of the thumb */
    z-index: 2; /* Ensure thumbs appear above the track */
  }

  .example-track {
    background-color: #ff715b; /* Set a distinct color for the filled portion of the slider */
    height: 5px;
    border-radius: 5px;
  }
`;
