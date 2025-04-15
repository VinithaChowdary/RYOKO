// HotelCards.jsx

import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const HotelCard = ({ image, name, ratings, stars, price }) => {

  const handleBooking = () => {
    // Confirm with the user before proceeding
    const isConfirmed = window.confirm('Are you sure you want to confirm the booking?');
  
    if (isConfirmed) {
      // Data to send to backend
      const bookingData = {
        hotel_name: name,
        price: price
      };
  
      axios.post('http://localhost:5001/bookHotel', bookingData)
        .then(response => {
          console.log('Booking successful:', response.data);
          alert('Booking successful!');
        })
        .catch(error => {
          console.error('Error making booking:', error);
          alert('Error making booking.');
        });
    } else {
      console.log('Booking canceled by the user.');
    }
  };
  

  return (
    <CardContainer>
      <CardContent>
        <ImageWrapper>
          <img src={image} alt={name} />
        </ImageWrapper>
        <DetailsWrapper>
          <h3>{name}</h3>
          <p>{ratings} ratings</p>
          <p>{stars} ⭐</p>
          <p>Price: ${price}</p>
          <button className="plus-btn" onClick={handleBooking}>+</button>
        </DetailsWrapper>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  width: 48%;
  margin: 10px 1%;

  &:hover {
    transform: translateY(-5px);
  }

  @media screen and (max-width: 768px) {
    width: 98%;
  }

  @media screen and (max-width: 480px) {
    width: 98%;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const ImageWrapper = styled.div`
  flex: 3;
  img {
    width: 100%;
    border-radius: 8px;
    max-height: 200px;
    object-fit: cover;
  }
`;

const DetailsWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }

  .plus-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  .plus-btn:hover {
    background-color: #0056b3;
  }
`;

export default HotelCard;
