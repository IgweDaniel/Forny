import React from "react";
import styled from "styled-components";
const CheckboxWrapper = styled.div`
  font-size: 13px;
  span {
    padding: 0 4px;
  }
`;

export const Checkbox = ({ label }) => {
  return (
    <CheckboxWrapper>
      <input type="checkbox" name="" id="" />
      <span>{label}</span>
    </CheckboxWrapper>
  );
};
