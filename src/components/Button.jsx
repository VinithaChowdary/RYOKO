import React from "react";
import styled from "styled-components";

export default function Button({ text, onClick }) {
  return <Btn onClick={onClick}>{text}</Btn>;
}

const Btn = styled.button`
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  border: none;
  font-size: 1.1rem;
  color: white;
  cursor: pointer;
  transition: padding 0.3s ease, background-color 0.3s ease;

  &:hover {
    padding: 1.2rem 2.4rem; /* Increase padding to make the button bigger */
    background-color: var(--secondary-color); /* Change to your desired hover color */
  }
`;
