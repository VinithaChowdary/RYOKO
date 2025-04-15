import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "./Button";
import Navbar from "./Navbar"; // Import Navbar component
import axios from "axios"; // Import axios for HTTP requests
import fl from "../assets/airplanebooking.jpeg";

export default function FlightBooking() {
  const [places, setPlaces] = useState([]); // State to store place names
  const [selectedSource, setSelectedSource] = useState(""); // State for selected source
  const [selectedDestination, setSelectedDestination] = useState(""); // State for selected destination
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [price, setPrice] = useState(""); // State to store the price

  // Fetch place names when the component mounts
  const handleBookFlight = async () => {
    console.log("handleBookFlight triggered");
  
    if (!selectedSource || !selectedDestination || !selectedDate || !price) {
      console.log("Validation failed:", { selectedSource, selectedDestination, selectedDate, price });
      alert("Please select source, destination, date, and ensure price is available.");
      return;
    }
  
    if (window.confirm("Do you want to book this flight?")) {
      alert("Flight booking successful!"); // Display the success alert here
  
      const requestData = {
        source: selectedSource,
        destination: selectedDestination,
        travelDate: selectedDate,
        price: price,
      };
  
      console.log("Sending booking request:", requestData);
  
      try {
        const response = await fetch("http://localhost:5001/bookFlight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error booking flight:", errorData);
          
        } else {
          const responseData = await response.json();
          console.log("Booking response received from backend:", responseData);
        }
      } catch (error) {
        console.error("Error during fetch request:", error);
       
      }
    } else {
      console.log("Booking canceled by user");
    }
  };
  
  
  
  
  useEffect(() => {
    axios
      .get("http://localhost:5001/place")
      .then((response) => {
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

  useEffect(() => {
    if (selectedSource && selectedDestination) {
      axios
        .post("http://localhost:5001/getFlightPrice", {
          source: selectedSource,
          destination: selectedDestination,
        })
        .then((response) => {
          setPrice(response.data.price); // Update price state with the fetched price
        })
        .catch((error) => {
          console.error("Error fetching flight price:", error);
          setPrice(""); // Reset price if an error occurs
        });
    } else {
      setPrice(""); // Reset price if source or destination is not selected
    }
  }, [selectedSource, selectedDestination]);
  


  return (
    <Section>
      <div className="background">
        <img src={fl} alt="Hero" />
      </div>
      <div className="content">
        <div className="info">
          <h1>It's Time To</h1>
          <h1>Book Your Flight</h1>
          <Button text="Book Now" />
        </div>
        <div className="planner">
          <form>
            <div className="row">
              <label>Source</label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="" disabled>
                  Select a Source
                </option>
                {places.map((place, index) => (
                  <option key={index} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <label>Destination</label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
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
              <label>Travel Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="row">
              <label>Price</label>
              <input
                type="text"
                value={price ? `$${price}` : "Select Source and Destination"}
                readOnly
              />
            </div>

            <div className="row">
            <Button text="Book Flight" onClick={handleBookFlight} />


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
      object-fit: cover;
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

          input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            filter: invert(58%) sepia(69%) saturate(2588%) hue-rotate(325deg)
              brightness(105%) contrast(101%);
          }

          input:focus {
            outline: none;
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
