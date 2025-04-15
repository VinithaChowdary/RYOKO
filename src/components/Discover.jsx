// components/Discover.js

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Testimonial from "./Testimonial";
import { useLocation } from "react-router-dom";
import HotelCard from "./HotelCards";
import styled from "styled-components";
import axios from "axios";

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
  hotel1,
  hotel2,
  hotel3,
  hotel4,
  hotel5,
  hotel6,
  hotel7,
  hotel8,
  hotel9,
  hotel10,
  hotel11,
  hotel12,
  hotel13,
  hotel14,
  hotel15,
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

const Discover = () => {
  const location = useLocation();

  // State to hold hotel data and selected images
  const [hotelData, setHotelData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // Get the search parameters from the query string
  const searchParams = new URLSearchParams(location.search);
  const destination = searchParams.get("destination");
  const priceMinStr = searchParams.get("priceMin");
  const priceMaxStr = searchParams.get("priceMax");

  const priceMin = priceMinStr !== null ? parseFloat(priceMinStr) : null;
  const priceMax = priceMaxStr !== null ? parseFloat(priceMaxStr) : null;

  console.log("Destination:", destination);
  console.log("Price Min:", priceMin);
  console.log("Price Max:", priceMax);

  useEffect(() => {
    if (!destination && (priceMin === null || priceMax === null)) {
      // If no filters are applied, you might want to fetch all hotels or handle accordingly
      console.log("No filters applied.");
      setHotelData([]);
      setSelectedImages([]);
      return;
    }

    // Fetch hotels based on destination and price range
    axios
      .post("http://localhost:5001/getHotels", {
        place: destination,
        priceMin: priceMin,
        priceMax: priceMax,
      })
      .then((response) => {
        const hotels = response.data.hotels;
        console.log("Hotels received from backend:", hotels.length);
        
        // Additional client-side filtering
        const filteredHotels = hotels.filter(hotel => hotel.price >= priceMin && hotel.price <= priceMax);
        console.log("Hotels after client-side filtering:", filteredHotels.length);
        
        setHotelData(filteredHotels);
        const images = getRandomImages(filteredHotels.length);
        setSelectedImages(images);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
        // Optionally handle the error
        setHotelData([]);
        setSelectedImages([]);
      });
  }, [destination, priceMin, priceMax]);

  return (
    <div>
      

      <HotelCardsContainer>
        {hotelData.length > 0 ? (
          hotelData
            .reduce((rows, hotel, index) => {
              if (index % 2 === 0) rows.push([]);
              rows[rows.length - 1].push({
                hotel,
                image: selectedImages[index % selectedImages.length] || hotelImages[0], // Use default image if none
              });
              return rows;
            }, [])
            .map((row, rowIndex) => (
              <HotelCardWrapper key={rowIndex}>
                {row.map(({ hotel, image }, idx) => (
                  <HotelCard
                    key={idx}
                    image={image}
                    name={hotel.hotel_name}
                    ratings={hotel.ratings}
                    stars={hotel.stars}
                    price={`$${hotel.price.toFixed(2)}`}
                  />
                ))}
              </HotelCardWrapper>
            ))
        ) : (
          <p>No hotels found.</p>
        )}
      </HotelCardsContainer>

      <Testimonial />
      <Footer />
    </div>
  );
};

const HotelCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HotelCardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default Discover;
