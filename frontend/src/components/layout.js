import React from "react";
import styled from "styled-components";

import { ReactComponent as Emoji } from "../assets/emoji.svg";
import { Link } from "react-router-dom";

const LayoutWrapper = styled.div`
  background: #e6eaf0;

  min-height: 100vh;
  header {
    background: #fff;
    height: 56px;
    display: flex;
    align-items: center;
  }
  header nav {
    margin: 0 auto;
    width: 80%;
    display: flex;
    align-items: center;
  }
  header nav .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  header nav .actions li {
    margin: 0 10px;
  }
  .logo {
    color: #6b7ddf;
  }
  body {
    background: green;
  }
  main {
    /* height: 100%; */
    /* height: 100%; */

    background: #e6eaf0;
  }

  footer {
    /* background: red; */
    height: 20px;
  }
`;

export const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <header>
        <nav>
          <div className="logo">
            <Link to="/">
              <h1>cForm</h1>
            </Link>
          </div>
          <ul className="actions">
            <li>
              <Link to="/forms">My Forms</Link>
            </li>
            <li>
              <Link to="/pricing">Upgrade to pro</Link>
            </li>
            <li>
              <Emoji />
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </LayoutWrapper>
  );
};
