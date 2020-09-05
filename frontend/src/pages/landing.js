import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Landing = () => {
  return (
    <LandingWrapper>
      <div>
        <Link to="/login">Login</Link> | <Link to="/login">Register</Link>
        <h1>
          Welcome to my cform.io a Saas app that helps with form submissions
        </h1>
      </div>
    </LandingWrapper>
  );
};
