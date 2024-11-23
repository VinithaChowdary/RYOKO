// SearchResults.jsx

import React from "react";
import Navbar from "./Navbar"; // Ensure Navbar is imported
import HotelCard from "./HotelCards";  // HotelCard component for rendering each hotel
import Testimonial from "./Testimonial"; // Import Testimonial component
import { useLocation } from "react-router-dom"; // Import useLocation to access navigation state

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

// Function to get a random selection of 4 images
const getRandomImages = () => {
  const shuffled = [...hotelImages];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled.slice(0, 4); // Return the first 4 random images
};

const SearchResults = () => {
  // Get 4 unique random hotel images
  const selectedImages = getRandomImages();

  // Access the hotels data passed via navigation state
  const location = useLocation();
  const { hotels } = location.state || { hotels: [] };

  // Fallback data in case no hotels data is passed
  const defaultHotels = [
    { hotel_name: "Hotel 1", ratings: "100", stars: "4", price: "200" },
    { hotel_name: "Hotel 2", ratings: "150", stars: "5", price: "250" },
    { hotel_name: "Hotel 3", ratings: "80", stars: "3", price: "150" },
    { hotel_name: "Hotel 4", ratings: "120", stars: "4", price: "220" },
  ];

  // Use the hotels data from the state if available, otherwise use default data
  const hotelData = hotels.length > 0 ? hotels : defaultHotels;

  return (
    <div>
      
      {/* Display Hotel Cards in two containers per row */}
      <div className="hotel-cards-container">
        <div className="hotel-card-wrapper">
          <HotelCard 
            image={selectedImages[0]} 
            name={hotelData[0].hotel_name} 
            ratings={hotelData[0].ratings} 
            stars={hotelData[0].stars} 
            price={hotelData[0].price} 
          />
          <HotelCard 
            image={selectedImages[1]} 
            name={hotelData[1].hotel_name} 
            ratings={hotelData[1].ratings} 
            stars={hotelData[1].stars} 
            price={hotelData[1].price} 
          />
        </div>
        <div className="hotel-card-wrapper">
          <HotelCard 
            image={selectedImages[2]} 
            name={hotelData[2].hotel_name} 
            ratings={hotelData[2].ratings} 
            stars={hotelData[2].stars} 
            price={hotelData[2].price} 
          />
          <HotelCard 
            image={selectedImages[3]} 
            name={hotelData[3].hotel_name} 
            ratings={hotelData[3].ratings} 
            stars={hotelData[3].stars} 
            price={hotelData[3].price} 
          />
        </div>
      </div>

      {/* Display Testimonials */}
      <Testimonial />
    </div>
  );
};

export default SearchResults;
