import React, { useState } from "react";
import styled from "styled-components";
import cuba from "../assets/cuba.png";
import paris from "../assets/paris.png";
import japan from "../assets/japan.png";
import Button from "./Button";

export default function Destinations({ scrollToTours }) {
  const initialDestinations = [
    { name: "Cuba City", image: cuba },
    { name: "Paris", image: paris },
    { name: "Japan", image: japan },
  ];

  const additionalDestinations = [
    { name: "Destination 1", image: `https://via.placeholder.com/400x200?text=Destination+1` },
    { name: "Destination 2", image: `https://via.placeholder.com/400x200?text=Destination+2` },
    { name: "Destination 3", image: `https://via.placeholder.com/400x200?text=Destination+3` },
    { name: "Destination 4", image: `https://via.placeholder.com/400x200?text=Destination+4` },
    { name: "Destination 5", image: `https://via.placeholder.com/400x200?text=Destination+5` },
    { name: "Destination 6", image: `https://via.placeholder.com/400x200?text=Destination+6` },
    { name: "Destination 7", image: `https://via.placeholder.com/400x200?text=Destination+7` },
    { name: "Destination 8", image: `https://via.placeholder.com/400x200?text=Destination+8` },
    { name: "Destination 9", image: `https://via.placeholder.com/400x200?text=Destination+9` },
    { name: "Destination 10", image: `https://via.placeholder.com/400x200?text=Destination+10` },
    { name: "Destination 11", image: `https://via.placeholder.com/400x200?text=Destination+11` },
    { name: "Destination 12", image: `https://via.placeholder.com/400x200?text=Destination+12` },
    { name: "Destination 13", image: `https://via.placeholder.com/400x200?text=Destination+13` },
    { name: "Destination 14", image: `https://via.placeholder.com/400x200?text=Destination+14` },
    { name: "Destination 15", image: `https://via.placeholder.com/400x200?text=Destination+15` },
    { name: "Destination 16", image: `https://via.placeholder.com/400x200?text=Destination+16` },
  ];

  const [showMore, setShowMore] = useState(false);
  const destinationsToDisplay = showMore
    ? [...initialDestinations, ...additionalDestinations]
    : initialDestinations;

  return (
    <Section id="destination">
      <div className="info">
        <h2>
          Top <span>Destinations</span> In The World
        </h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout from it.
        </p>
        <Button text="Discover More" onClick={() => { setShowMore(!showMore); scrollToTours(); }} />
      </div>

      <div className={`destinations ${showMore ? "carousel" : ""}`}>
        {destinationsToDisplay.map(({ name, image }) => {
          return (
            <div className="destination" key={name}>
              <div className="image">
                <img src={image} alt={name} />
              </div>
              <div className="name">
                <h3>{name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  gap: 5rem;

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 3rem;

    h2 {
      font-size: 3rem;
      line-height: 3rem;

      span {
        color: var(--primary-color);
      }
    }

    p {
      color: var(--secondary-text);
    }
  }

  .destinations {
    flex: 2;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;

    .destination {
      position: relative;
      display: inline-block;

      img {
        height: 20rem;
        transition: height 0.3s ease;
      }

      .name {
        position: absolute;
        bottom: 0rem;
        height: 100%;
        width: 100%;
        background: linear-gradient(to bottom, #ffffff14, #000000ae);
        display: flex;
        flex-direction: column-reverse;

        h3 {
          margin-left: 1rem;
          font-size: 1.5rem;
          color: white;
        }
      }
    }
  }

  .carousel {
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .carousel::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin: 0rem 2rem;
    flex-direction: column;
    gap: 3rem;

    .destinations {
      flex-direction: column;

      .destination {
        img {
          width: 100%;
        }
      }
    }
  }
`;
