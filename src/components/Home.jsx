import React, { useState } from "react";
import styled from "styled-components";
import ReactSlider from "react-slider";
import HeroImage from "../assets/hero.png";
import Button from "./Button";
import Navbar from "./Navbar"; // Import Navbar component

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [priceRange, setPriceRange] = useState([500, 10000]); // Single state for price range

  // Handler to update price range when slider is moved
  const handleSliderChange = (newValue) => {
    setPriceRange(newValue);
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
              <select>
                <option>Arab Egypt</option>
                <option>Udaipur India</option>
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
                value={`₹${priceRange[0]} - ₹${priceRange[1]}`}
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
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onChange={handleSliderChange}
                  pearling
                  minDistance={500}
                  renderTrack={(props, state) => {
                    const left = `${(priceRange[0] / 10000) * 100}%`;
                    const right = `${100 - (priceRange[1] / 10000) * 100}%`;

                    return (
                      <div
                        {...props}
                        className="example-track"
                        style={{
                          ...props.style,
                          left: left,
                          right: right,
                          backgroundColor: '#ff715b', // Match slider track color
                        }}
                      />
                    );
                  }}
                />
              </SliderContainer>
            </div>
            <div className="row">
              <Button text="Discover More" />
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

  .horizontal-slider {
    width: 100%;
    height: 5px;
    border-radius: 5px;
    position: relative;
  }

  .example-thumb {
    height: 15px;
    width: 15px;
    background-color: #ff715b; // Match thumb color with the button color
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
    top: -5px;
  }

  .example-track {
    height: 5px;
    position: absolute; // Ensure it's positioned correctly
    top: 0; // Align with the slider height
  }
`;
