import React, { forwardRef } from "react";
import styled from "styled-components";
import { BsFillStarFill } from "react-icons/bs";
import Slider from "react-slick"; // Importing the carousel component
import tour1 from "../assets/tour1.png";
import tour2 from "../assets/tour2.png";
import tour3 from "../assets/tour3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Tours = forwardRef((props, ref) => {
  const data = [
    {
      image: tour1,
      title: "Santorini, Oia Greece",
      price: 2000,
      reviews: "5k Reviews",
    },
    {
      image: tour2,
      title: "Lighthouse, Bellwood",
      price: 4000,
      reviews: "5k Reviews",
    },
    {
      image: tour3,
      title: "Riverfront, Japan",
      price: 3000,
      reviews: "5k Reviews",
    },
  ];

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    focusOnSelect: true,
    centerMode: true,  // This will keep the middle image raised as in your original layout
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 1,
          centerMode: false, // Disable center mode on smaller screens
        },
      },
    ],
  };

  return (
    <Section ref={ref} id="tour">
      <h2>Choose Your Destination</h2>
      <Slider {...settings} className="tours"> {/* Wrap the content inside Slider */}
        {data.map(({ image, title, price, reviews }, index) => {
          return (
            <div className="tour" key={title}>
              <div className="image">
                <img src={image} alt="tour" />
              </div>
              <div className="info">
                <div className="details">
                  <h4>{title}</h4>
                  <div className="price-details">
                    <span className="price">${price}</span>
                    <div className="reviews">
                      <div className="stars">
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                      </div>
                      <span className="review">{reviews}</span>
                    </div>
                  </div>
                </div>
                <button>+</button>
              </div>
            </div>
          );
        })}
      </Slider>
    </Section>
  );
});

const Section = styled.section`
  margin-top: 10rem; /* Reduced gap between heading and carousel */
  margin-bottom: 5rem;
  position: relative;
  h2 {
    text-align: center;
    transform: translateY(-100px); /* Reduced transform for less space */
    font-size: 3rem;
    margin-bottom: 1.5rem; /* Reduced margin-bottom to reduce gap */
  }
  .tours {
    display: flex;
    gap: 1.5rem; /* Reduced gap between the slides */
    justify-content: center;
    .tour {
      position: relative;
      width: 250px; /* Reduced width of each slide */
      .image {
        img {
          height: 25rem; /* Reduced height of the images */
          width: 100%;
          object-fit: cover;
        }
      }
      .info {
        position: relative; /* Change to relative to keep it within the box */
        bottom: -1.5rem; /* Adjust for proper spacing */
        right: 0;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.5rem; /* Increased gap between the content */
        padding: 2rem; /* Increased padding */
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        button {
          padding: 0.5rem 0.7rem;
          background-color: var(--primary-color);
          border: none;
          font-size: 1.2rem; /* Slightly larger button */
          color: white;
          cursor: pointer;
        }
        .details {
          display: flex;
          flex-direction: column;
          gap: 1rem; /* Increased gap between elements inside the details */
          .price-details {
            display: flex;
            gap: 1rem;
            .price {
              color: var(--primary-color);
              font-weight: bolder;
              font-size: 1.3rem; /* Increased price size */
            }
            .reviews {
              display: flex;
              gap: 0.5rem;
              .stars {
                svg {
                  color: #ffc01e;
                }
              }
              .review {
                color: var(--secondary-text);
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0 2rem;
    h2 {
      transform: translateY(0px);
      font-size: 2rem;
    }
    .tours {
      flex-direction: column;
      gap: 5rem;
      .tour {
        button {
          display: none !important;
        }
        .image {
          img {
            max-inline-size: 100%;
            block-size: auto;
          }
        }
      }
    }
  }
`;

export default Tours;
