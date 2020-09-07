import React from "react";
import styled from "styled-components";

import { ReactComponent as Egg } from "../assets/egg.svg";
import { Link } from "react-router-dom";

const MyFormWrapper = styled.div`
  .forms {
    margin: 40px auto;
  }

  .form-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 210px);
    grid-auto-rows: 217px;
    column-gap: 40px;
  }
  .form-list a {
    height: 100;
    width: 100%;
  }
  .add-form {
    border-radius: 5px;
    box-shadow: none;
    background: transparent;
    border-style: dashed;
    border-width: 1px;
    padding: 69px 0;
    border-color: rgba(147, 151, 165, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .form {
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s;
    margin-bottom: 24px;
    color: #282a2d;
    position: relative;
    box-shadow: 0 2px 2px 0 rgba(212, 219, 226, 0.51);
    height: 100%;
  }

  .form .top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60%;

    border-bottom: 1px solid #f1f3f6;
  }

  .form .bottom {
    height: 40%;
    padding: 16px;
  }
  .form .bottom .form-name {
    font-weight: 600;
  }
  .form .bottom .form-stats {
    margin: 5px 0;
  }
  .title {
    margin: 20px 0;
  }
`;

const forms = [
  {
    id: 1,
    name: "igwedaniel.github.io",
    no_submissions: 10,
  },
  {
    id: 2,
    name: "cvm.com",
    no_submissions: 2,
  },
];

export const MyForms = () => {
  return (
    <MyFormWrapper>
      <div className="container forms">
        <h2 className="title">My Forms</h2>

        <div className="form-list">
          <div className="add-form">
            <img src={require("../assets/addbg.png")} alt="" />
          </div>
          {forms.map((form) => (
            <Link to={`/${form.id}`}>
              <div className="form" key={form.name}>
                <div className="top">
                  <Egg />
                </div>
                <div className="bottom">
                  <p className="form-name">{form.name}</p>
                  <p className="form-stats">
                    <span className="emph">{form.no_submissions}</span>{" "}
                    submissions
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MyFormWrapper>
  );
};
