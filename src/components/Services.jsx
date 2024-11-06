import React from "react";
import styled from "styled-components";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";
import aiImage from "../assets/ai.png"; // AI destination planner image
import hotelImage from "../assets/hotels.jpeg"; // Hotel booking image
import flightImage from "../assets/aeroplane.jpeg"; // Flight booking image

export default function Services() {
  const data = [
    {
      image: service1,
      title: "Choose Destination",
      description: "Select from a variety of breathtaking locations to make your dream getaway a reality.",
    },
    {
      image: service2,
      title: "Explore the Place",
      description: "Discover hidden gems and popular attractions as you immerse yourself in the local culture.",
    },
    {
      image: service3,
      title: "Start Your Journey",
      description: "Kick off your adventure with tailored itineraries designed to make the most of your travel experience.",
    },
    {
      image: service4,
      title: "Let's Enjoy",
      description: "Relax and enjoy your trip, knowing every detail is taken care of for a seamless experience.",
    },
    {
      image: flightImage,
      title: "Book Flights",
      description: "Find the best deals on flights to your chosen destination with ease and convenience.",
    },
    {
      image: hotelImage,
      title: "Book Hotels",
      description: "Choose from a wide range of accommodations to suit your style and budget for a comfortable stay.",
    },
    {
      image: aiImage,
      title: "AI Destination Planner",
      description: "Let our AI planner create a personalized itinerary that fits your preferences and interests.",
    },
  ];

  return (
    <Section id="services">
      <div className="services">
        {data.map(({ image, title, description }) => {
          return (
            <div className="service" key={title}>
              <img src={image} alt={title} />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 8rem 4rem;
  .services {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    justify-content: center; // Center aligns the grid itself
    .service {
      padding: 1.5rem 2rem;
      text-align: center;
      background-color: var(--card-grey);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      h3 {
        color: var(--primary-text);
      }
      p {
        color: var(--secondary-text);
      }
      img {
        height: 128px;
        width: 128px;
      }
      transition: var(--default-transition);
      &:hover {
        background-color: white;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 3rem;
    .services {
      grid-template-columns: repeat(1, 1fr);
      justify-content: center; // Center when in single-column layout
    }
  }

  @media screen and (min-width: 1081px) {
    .services {
      grid-auto-flow: dense; // Ensures cards fill empty spaces efficiently
    }
  }
`;
