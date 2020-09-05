import React from "react";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  background: #e6eaf0;
  height: 100%;
  header {
    background: #fff;
    height: 56px;
    color: #fff;
  }
  body {
    background: green;
  }
  main {
    height: 100%;
    /* background: #e6eaf0; */
  }

  footer {
    background: red;
    height: 20px;
  }
`;

export const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </LayoutWrapper>
  );
};
