// SearchResults.jsx

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Ensure Navbar is imported
import HotelCard from "./HotelCards";  // HotelCard component for rendering each hotel
import Testimonial from "./Testimonial"; // Import Testimonial component
import { useLocation } from "react-router-dom"; // Import useLocation to access navigation state
import axios from 'axios';

import hotel1 from "../assets/hotel1.jpeg";
import hotel2 from "../assets/hotel2.jpeg";
import hotel3 from "../assets/hotel3.jpeg";
import hotel4 from "../assets/hotel4.jpeg";
import hotel5 from "../assets/hotel5.jpeg";
import hotel6 from "../assets/hotel6.jpeg";
import hotel7 from "../assets/hotel7.jpeg";
import hotel8 from "../assets/hotel8.jpeg";
import hotel9 from "../assets/hotel9.jpeg";
import hotel10 from "../assets/hotel10.jpeg";
import hotel11 from "../assets/hotel11.jpeg";
import hotel12 from "../assets/hotel12.jpeg";
import hotel13 from "../assets/hotel13.jpeg";
import hotel14 from "../assets/hotel14.jpeg";
import hotel15 from "../assets/hotel15.jpeg";

// Array containing all hotel images
const hotelImages = [
  hotel1, hotel2, hotel3, hotel4, hotel5, hotel6, hotel7,
  hotel8, hotel9, hotel10, hotel11, hotel12, hotel13, hotel14, hotel15
];

// Function to get a random selection of images
const getRandomImages = (count) => {
  const shuffled = [...hotelImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled.slice(0, count); // Return the first 'count' random images
};

const SearchResults = () => {
  // State to hold hotel data and selected images
  const [hotelData, setHotelData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Access the hotels data passed via navigation state
  const location = useLocation();
  const { hotels } = location.state || {};

  // Get the search term from the query parameters
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('term');

  useEffect(() => {
    if (hotels && hotels.length > 0) {
      // If hotels data is passed via location.state, use it
      setHotelData(hotels);
      const images = getRandomImages(hotels.length);
      setSelectedImages(images);
    } else if (term) {
      // Fetch hotels based on the search term
      axios.post('http://localhost:5001/getHotels', { place: term })
        .then(response => {
          setHotelData(response.data.hotels);
          const images = getRandomImages(response.data.hotels.length);
          setSelectedImages(images);
        })
        .catch(error => {
          console.error('Error fetching hotels:', error);
          // Optionally handle the error, e.g., set a message or default data
        });
    } else {
      // If no data is available, set default data
      const defaultHotels = [
        { hotel_name: "Hotel 1", ratings: "100", stars: "4", price: "200" },
        { hotel_name: "Hotel 2", ratings: "150", stars: "5", price: "250" },
        { hotel_name: "Hotel 3", ratings: "80", stars: "3", price: "150" },
        { hotel_name: "Hotel 4", ratings: "120", stars: "4", price: "220" },
      ];
      setHotelData(defaultHotels);
      const images = getRandomImages(defaultHotels.length);
      setSelectedImages(images);
    }
  }, [hotels, term]);

  // Keep your existing layout with minimal changes
  return (
    <div>
      {/* Include Navbar if needed */}
     

      {/* Display Hotel Cards in two containers per row */}
      <div className="hotel-cards-container">
        {/* Divide hotelData into chunks of 2 to maintain your layout */}
        {hotelData.length > 0 && selectedImages.length > 0 ? (
          hotelData.reduce((rows, hotel, index) => {
            if (index % 2 === 0) rows.push([]);
            rows[rows.length - 1].push({ hotel, image: selectedImages[index % selectedImages.length] });
            return rows;
          }, []).map((row, rowIndex) => (
            <div className="hotel-card-wrapper" key={rowIndex}>
              {row.map(({ hotel, image }, idx) => (
                <HotelCard 
                  key={idx}
                  image={image} 
                  name={hotel.hotel_name} 
                  ratings={hotel.ratings} 
                  stars={hotel.stars} 
                  price={hotel.price} 
                />
              ))}
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>

      {/* Display Testimonials */}
      <Testimonial />
    </div>
  );
};

export default SearchResults;
