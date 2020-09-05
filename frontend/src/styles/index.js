import styled from "styled-components";
export { GlobalStyle } from "./globalStyle";
export { theme } from "./theme";

export const Card = styled.div`
  padding: 20px 24px;
  width: 100%;
  width: 390px;
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.04);
  background-color: #fff;
  border: 1px solid #f5f5f5;
`;

export const CenterChild = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CenterVertically = styled.div`
  display: flex;
  align-items: center;
`;
export const Button = styled.button`
  background: #6b7ddf;
  font-weight: 600;
  color: #fff;
  width: 100%;

  padding: 13px;
  text-align: center;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  text-transform: uppercase;
  outline: none;
  height: 50px;
  cursor: pointer;
  margin: ${({ margin }) => (margin ? margin : "")};
`;
