import React, { useRef } from "react";
import styled from "styled-components";
import { CenterVertically } from "../../styles";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";

const InputWrapper = styled(CenterVertically)`
  height: 56px;
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-color: #e1e4e8;
  padding: 15px;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  /* border-color: ${({ inputFilled }) =>
    inputFilled ? "#6b7ddf" : "#e1e4e8"}; */

  &.focus {
    border-color: #6b7ddf;
  }
  &:hover {
    border-color: #6b7ddf;
  }
  .input-wrapper {
    width: 100%;
    height: 100%;
  }
  .input-wrapper.password {
    display: flex;
    align-items: center;
  }
  .input-wrapper.password input {
    width: 80%;
  }
  .input-wrapper.password .icon {
    cursor: pointer;
    width: 20%;
    justify-content: flex-end;
  }
  input,
  label,
  .placeholder {
    transition: all 0.1s ease-out;
  }
  label,
  .placeholder {
    color: #aaa;
  }
  label {
    position: absolute;
    top: 7px;
    font-weight: 600;
    font-size: 13px;

    transform: ${({ inputFilled }) =>
      inputFilled ? "translateY(0px)" : "translateY(-50px)"};
  }
  input {
    position: relative;
    width: 100%;
    background: transparent;
    height: 100%;

    border: none;
    outline: 0;
    font-size: 15px;
    z-index: 1;
    transform: ${({ inputFilled }) =>
      inputFilled ? "translateY(5px)" : "translateY(0px)"};
  }
  .placeholder {
    position: absolute;
    top: 50%;

    transform: ${({ inputFilled }) =>
      inputFilled ? "translateY(100px)" : "translateY(-50%)"};
  }
`;

export const Input = ({ placeholder, type, value, onChange }) => {
  const [inputFilled, setInputFilled] = useState(false);
  const inp = useRef(null);
  function handleInputChange(e) {
    const hasTyped = e.target.value != "";
    setInputFilled(hasTyped);
    onChange(e.target.value);
  }

  function handleFocus(e) {
    e.target.parentElement.classList.add("focus");
  }
  function handleBlur(e) {
    e.target.parentElement.classList.remove("focus");
  }

  let inputElement = null;
  switch (type) {
    case "password":
      inputElement = (
        <div className="input-wrapper password">
          <input
            ref={inp}
            type={type}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div className="icon">
            <FaEyeSlash size={20} />
          </div>
        </div>
      );
      break;
    //   FaEyeSlash

    default:
      inputElement = (
        <div className="input-wrapper text">
          <input
            ref={inp}
            type={type}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      );
  }
  return (
    <InputWrapper inputFilled={inputFilled} onClick={() => inp.current.focus()}>
      <label htmlFor="">{placeholder}</label>
      {inputElement}
      <div className="placeholder">{placeholder}</div>
    </InputWrapper>
  );
};

Input.defaultProps = {
  type: "text",
  onChange: () => {},
};
